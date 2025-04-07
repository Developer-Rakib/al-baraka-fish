"use client";
import { useState, useRef, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { Editor, EditorState, RichUtils, convertToRaw, Modifier } from "draft-js";
import { stateToHTML } from "draft-js-export-html"; // Convert Draft.js content to HTML
import "draft-js/dist/Draft.css";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "./layout";

// Custom font size styles
const styleMap = {
    SMALL: { fontSize: "12px" },
    MEDIUM: { fontSize: "16px" },
    LARGE: { fontSize: "20px" },
};

export default function AdminPage() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const editorRef = useRef(null);

    // Handle text formatting (bold, italic)
    const handleStyleChange = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Handle block formatting (lists)
    const handleBlockChange = (blockType) => {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    // Handle font size changes
    const toggleFontSize = (size) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, size));
    };

    // Add a link to the selected text
    const addLink = () => {
        const url = prompt("Enter the URL:"); // Get URL from the user
        if (!url) return;

        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();

        // Create an entity for the link
        const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", { url });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        // Apply the entity to selected text
        const newContentState = Modifier.applyEntity(contentStateWithEntity, selection, entityKey);
        setEditorState(EditorState.push(editorState, newContentState, "apply-entity"));
    };


    // Convert editor content to HTML
    // Convert editor content to HTML
    const getHTML = () => {
        const contentState = editorState.getCurrentContent();
        return stateToHTML(contentState, {
            entityStyleFn: (entity) => {
                const data = entity.getData();
                if (entity.getType() === "LINK") {
                    return { element: "a", attributes: { href: data.url, target: "_blank" } };
                }
                return undefined;
            },
            inlineStyleFn: (style) => {
                if (style.has("SMALL")) {
                    return { element: "span", style: { fontSize: "12px" } };
                }
                if (style.has("MEDIUM")) {
                    return { element: "span", style: { fontSize: "16px" } };
                }
                if (style.has("LARGE")) {
                    return { element: "span", style: { fontSize: "20px" } };
                }
            },
        });
    };
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.focus();
        }
    }, []); // Focus the editor when the component mounts


    const { register, formState: { errors }, handleSubmit, reset } = useForm();


    const imgStorage_key = `d68a616868fb8cf36774dec992056cdd`

    const onSubmit = async data => {
        if (getHTML() === '<p><br></p>') {
            Swal.fire({
                icon: "error",
                title: "Warning!",
                text: "Please write description!",
            });
            return;
        }


        const img = data.img[0];
        const formData = new FormData();
        formData.append('image', img);
        // console.log(formData);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorage_key}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const imgUrl = result.data.url;
                    // console.log(imgUrl);
                    const course = {
                        courseName: data.courseName,
                        courseThumbnail: imgUrl,
                        courseDetails: getHTML(),
                        courseReviews: [],
                    }
                    axios.post(`https://server.mzamanbd.com/liveCourse`, course)
                        .then(data => {
                            // console.log(data.data.success);
                            console.log(data.data);
                            if (data.data.success) {
                                toast.success(`${data.data.message}`)
                                reset()
                            }
                            else {
                                toast.error(`${data.data.message}`)

                            }

                        })

                }
            })

    }

    // console.log(getHTML());
    return (
        <layoute>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
                <p className="text-gray-600 mt-2">Your admin dashboard content goes here.</p>
            </div>
        </layoute>
        // <div className="shadow-lg p-8 border rounded-lg w-11/12 sm:w-7/12 mx-auto">
        //     <div className="border p-4 rounded-lg mx-aut ">
        //         <h2 className="text-lg font-semibold mb-2 text-[#426B69]">Description Editor</h2>

        //         {/* Formatting Buttons */}
        //         <div className="mb-2 space-x-2">
        //             <button onClick={() => handleStyleChange("BOLD")} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        //                 <strong>Bold</strong>
        //             </button>
        //             <button onClick={() => handleStyleChange("ITALIC")} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        //                 <em>Italic</em>
        //             </button>
        //             <button onClick={() => handleBlockChange("unordered-list-item")} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        //                 <ul>
        //                     Bullet List

        //                 </ul>
        //             </button>
        //             <button onClick={() => handleBlockChange("ordered-list-item")} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
        //                 Numbered List
        //             </button>
        //             <button onClick={addLink} className="px-3 py-1 bg-violet-600 text-white rounded hover:bg-violet-800">
        //                 Link
        //             </button>
        //         </div>

        //         {/* Font Size Buttons */}
        //         <div className="mb-2 space-x-2">
        //             <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => toggleFontSize("SMALL")}>Small</button>
        //             <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => toggleFontSize("MEDIUM")}>Medium</button>
        //             <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => toggleFontSize("LARGE")}>Large</button>
        //         </div>

        //         {/* Editor Container */}
        //         <div className="border p-3 min-h-[150px] cursor-text rounded" onClick={() => editorRef.current?.focus()}>
        //             <Editor ref={editorRef} editorState={editorState} onChange={setEditorState} customStyleMap={styleMap} />
        //         </div>

        //         {/* Button to Get HTML Output */}
        //         {/* <button onClick={() => alert(getHTML())} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        //                 Get HTML Output
        //             </button> */}



        //     </div>
        //     <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">

        //         <div className="my-3">
        //             <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Course Name' {...register("courseName", {
        //                 required: {
        //                     value: true,
        //                     message: 'Course Name is Required'
        //                 }
        //             })} />
        //             <label className="label">
        //                 {errors.courseName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.courseName.message}</span>}
        //             </label>
        //         </div>


        //         <div className="flex mb-6 items-center text-gray-500">
        //             <label className="label mr-2 ">
        //                 <span className="label-text">Select Banner</span>

        //             </label>
        //             <input type={'file'} className='bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ' {...register("img", {
        //                 required: {
        //                     value: true,
        //                     message: 'image is Required'
        //                 }
        //             })} />
        //             <label className="label ml-1">
        //                 {errors.img?.type === 'required' && <span className="label-text-alt text-red-500">{errors.img.message}</span>}
        //             </label>
        //         </div>


        //         <input
        //             style={{ fontFamily: 'Open Sans, sans-serif', letterSpacing: '2px' }} className="hover:bg-white transition w-40 mx-auto text-center bg-[#426B69]  hover:text-[#426B69] rounded-full text-white border-2 border-[#426B69]-500 py-2" type={'submit'} value={'submit course'} />

        //     </form>


        //     {/* <textarea className='h-32 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Description' {...register("description", {
        //             required: {
        //                 value: true,
        //                 message: 'Description is Required'
        //             }
        //         })} /> */}
        //     {/* <label className="label">
        //             {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
        //         </label> */}





        //     {/* <div className='sm:flex  justify-between'>
        //             <div className='sm:w-6/12 w-full'>
        //                 <input className='input input-bordered w-ful input-md sm:px-5' placeholder='Price'
        //                     type={'number'}
        //                     {...register("price", {
        //                         required: {
        //                             value: true,
        //                             message: 'Price is Required'
        //                         },

        //                     })} />
        //                 <label className="label">
        //                     {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}

        //                 </label>
        //             </div>
        //             <div className='sm:w-6/12 w-full'>
        //                 <input className='input input-bordered input-md sm:px-5' placeholder='Available Quantity'
        //                     type={'number'}
        //                     {...register("availableQuantity", {
        //                         required: {
        //                             value: true,
        //                             message: 'Available Quantity is Required'
        //                         },

        //                     })} />
        //                 <label className="label">
        //                     {errors.availableQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.availableQuantity.message}</span>}

        //                 </label>
        //             </div>
        //         </div> */}

        //     {/* <input className='input input-bordered input-md' placeholder='Minimum Order Quantity'
        //             type={'number'}
        //             {...register("minimunOrderQuantity", {
        //                 required: {
        //                     value: true,
        //                     message: 'Minimum Order Quantity is Required'
        //                 },

        //             })} />
        //         <label className="label">
        //             {errors.minimunOrderQuantity?.type === 'required' && <span className="label-text-alt text-red-500">{errors.minimunOrderQuantity.message}</span>}
        //         </label>
        //         <label className="label">
        //             <span className="label-text">Select Image</span>

        //         </label>
        //         <input type={'file'} className='ml-1 ' {...register("img", {
        //             required: {
        //                 value: true,
        //                 message: 'image is Required'
        //             }
        //         })} />
        //         <label className="label">
        //             {errors.img?.type === 'required' && <span className="label-text-alt text-red-500">{errors.img.message}</span>}
        //         </label>


        //         <textarea className='input h-32 mt-2 input-bordered input-md' placeholder='Description' {...register("description", {
        //             required: {
        //                 value: true,
        //                 message: 'Description is Required'
        //             }
        //         })} />
        //         <label className="label">
        //             {errors.description?.type === 'required' && <span className="label-text-alt text-red-500">{errors.description.message}</span>}
        //         </label> */}





        // </div>
    );
}
