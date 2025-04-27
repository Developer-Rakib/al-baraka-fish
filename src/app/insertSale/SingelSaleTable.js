import moment from 'moment';
import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBack2Line } from 'react-icons/ri';

function SingelSaleTable({ sale, index, handleInfoSave, toggleModal, isModalOpen }) {
    // console.log(sale);
    const date = moment(sale.date).format("DD MMM YY");

    return (
        <tr key={index} className="text-center hover:bg-gray-100 transition">
            <td className="p-3 border sm:text-[12px] text-[9px] ">
                {
                    index + 1
                }
            </td>
            <td className="p-3 border sm:text-[12px] text-[9px] ">
                {
                    date
                }
            </td>
            <td className="p-3 border sm:text-[12px] text-[9px] ">{sale.itemName}</td>
            <td className="p-3 border sm:text-[12px] text-[9px] ">{sale.kg}</td>
            {/* <td className="p-3 border sm:text-[12px] text-[9px] ">{sale.unitprice}</td> */}
            <td className="p-3 border sm:text-[12px] text-[9px] ">{sale.amount}</td>
            <td className="p-3 border sm:text-[12px] text-[9px]  relative">{sale.profit}
                {/* modal btn  */}
                {/* // role === "admin" && */}
                <label htmlFor="my-modal-4" className="" onClick={toggleModal}>
                    <FaRegEdit
                        className='absolute right-0 top-0 text-yellow-600 cursor-pointer'></FaRegEdit>
                </label>



                {/* modal  */}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="modal modal-open">
                            <div className="modal-box">
                                <form onSubmit={(e) => handleInfoSave(e, sale)} className='text-center'>
                                    <div className="shadow  overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-4 bg-gray-50 sm:px-6">
                                            <h3 className="text-xl.
                                                                leading-6 font-medium text-gray-900">Insert Fish Information</h3>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="flex">

                                                <div className="col-span-6 w-32 mx-2cd   sm:col-span-2">
                                                    <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                                                    <input id="itemName" name="itemName" defaultValue={sale.itemName}
                                                        type="text" autoComplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                    />
                                                </div>
                                                <div className="col-span-6 w-32 mx-2cd   sm:col-span-2 ">
                                                    <label htmlFor="kg" className="block text-sm font-medium text-gray-700">Qty</label>
                                                    <input type={"text"} id="kg" name="kg" autoComplete="kg" defaultValue={sale.kg} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 w-32 mx-2cd   sm:col-span-2 ">
                                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                                    <input type={"text"} id="amount" name="amount" autoComplete="amount" defaultValue={sale.amount} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-6 w-32 mx-2cd   sm:col-span-2 ">
                                                    <label htmlFor="profit" className="block text-sm font-medium text-gray-700">Profit</label>
                                                    <input type={"text"} id="profit" name="profit" autoComplete="profit" defaultValue={sale.profit} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    />
                                                </div>




                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button
                                                type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                                        </div>
                                    </div>
                                </form>

                                {/* Modal actions */}
                                <div className="modal-action">
                                    <button className="btn" onClick={toggleModal}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}




                {
                    // editModal &&
                    // <EditEntryModal
                    //     order={singleEntry}
                    //     setEditModal={setEditModal}
                    //     setOrder={setSingleEntry}
                    // />
                }
                {
                    // role === 'admin' &&
                    <span onClick={() => handleDelete(sale)} className='cursor-pointer'>
                        <RiDeleteBack2Line className='text-red-600 absolute text-[10px] sm:text-[15px] sm:top-6 bottom-0  right-0' />
                    </span>
                }
            </td>
        </tr>
    )
}

export default SingelSaleTable