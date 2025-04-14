import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import toast from 'react-hot-toast';
import EditFishStockModal from './EditFishStockModal'
import { FaRegEdit } from 'react-icons/fa'

function SingleFishStock({ i, singleFish, setFishStock, fishStock }) {
    const [editModal, setEditModal] = useState(null)


    // console.log(singleFish);

    function handleInfoSave(e, singeFish) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formatedData = Array.from(formData.entries())
        // console.log(formData);
        let stockData = {}
        formatedData.map((data) => {
            let obj = {
                ...stockData,
                [data[0]]: data[1],
            }
            stockData = obj
        })

        // console.log(sellerName);

        let editedData = {
            itemName: stockData.itemName,
            buyPricePerKG: parseFloat(stockData.buyPricePerKG),
            sellPricePerKG: parseFloat(stockData.sellPricePerKG),
            peaceStockQty: parseFloat(stockData.peaceStockQty),
        }

        // console.log(editedData);
        axios.put(`https://admin.mzamanbd.com/fishStock/update/${singeFish._id}`, editedData)
            .then(data => {
                // console.log(data.data);
                if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
                    toast.success("Entry updated")
                    document.getElementById('my-modal-4').checked = false;



                    setFishStock(fishStock)
                    setEditModal(false)
                }
                else {
                    toast.error("Something is wrong, please try again")
                }
            })
    }

    return (
        <tr key={singleFish._id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
            <th scope="row" className="pl-2 pr-1 sm:pr-0 sm:pl-5 py-2  sm:py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap text-[9px] sm:text-[13px] ">
                {i + 1}
            </th>
            <td className="py-2 text-[9px] sm:text-[13px]  sm:py-4 capitalize">
                {singleFish.itemName}
            </td>
            <td className="py-2     text-[9px] sm:text-[13px]  sm:py-4">

                {singleFish?.variation &&

                    singleFish?.variation.map((f, i) => {
                        return <p className='border-b' key={i}>{f.type}</p>
                    })
                    // :
                    // singleFish.itemName
                }
            </td>




            <td className="py-2   text-[9px] sm:text-[13px]   text-center sm:py-4">
                {singleFish?.variation ?

                    singleFish?.variation.map((f, i) => {
                        return <p className='border-b' key={i}>{f.buyPricePerKG}</p>
                    })
                    :
                    singleFish.buyPricePerKG
                }
            </td>
            <td className="py-2   text-[7px] sm:text-[13px]   text-center sm:py-4">
                {singleFish?.variation ?

                    singleFish?.variation.map((f, i) => {
                        return <p className='border-b' key={i}>{f.sellPricePerKG}</p>
                    })
                    :
                    singleFish.sellPricePerKG
                }

            </td>
            {/* <td className="py-2   text-[7px] sm:text-[13px]   text-center sm:py-4">
                {
                    singleFish.peaceStockQty
                }

            </td> */}
            <td className="py-2 text-[7px] sm:text-[13px]   text-center sm:py-4">
                <label onClick={() => setEditModal(true)} htmlFor="my-modal-4" className="">
                    <FaRegEdit
                        className=' text-yellow-600 cursor-pointer'></FaRegEdit>
                </label>


                {
                    editModal &&
                    <EditFishStockModal
                        singeFish={singleFish}
                        handleInfoSave={handleInfoSave}
                    />
                }



            </td>
            {/* <td className=" text-[9px] sm:text-[13px]   text-center sm:py-4 hidden   h-full">
                                                                    <span className='grow h-full'>{totalItemQty}</span>
                                                                </td> */}
            {/* <td className="py-2 text-[9px] sm:text-[13px]  text-center sm:py-4 relative ">


                                                          



                                                            {!singleFish.paid &&
                                                    
                                                                <p className='text-red-500'>Unpaid</p>
                                                            }
                                                            {
                                                                (!singleFish.shipped && singleFish.paid) && <p className='text-green-500'>Pending</p>
                                                            }
                                                            {
                                                                singleFish.shipped && <p className='text-green-700'>Paid</p>
                                                            }
                                                        </td> */}


        </tr>
    )
}

export default SingleFishStock