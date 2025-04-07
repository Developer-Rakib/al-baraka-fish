import React, { useEffect, useState } from 'react'


function EditEntryModal({ singeFish, setEditModal, handleInfoSave }) {


    useEffect(() => {
        // setSatus(order.status)
    }, [])



    // console.log(document.getElementById('my-modal-4').checked);

    return (
        <>
            <input type="checkbox" id="my-modal-4" className="modal-toggle hidden" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer bg-white py-5 rounded-lg" >
                <label className="modal-box text-right" htmlFor="">
                    <label onClick={() => setEditModal(false)} htmlFor="my-modal-4" className="btn btn-sm btn-circle cursor-pointer">✕</label>
                    <form onSubmit={(e) => handleInfoSave(e, singeFish)} className='text-center'>
                        <div className="shadow  overflow-hidden sm:rounded-md">
                            <div className="px-4 py-4 bg-gray-50 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Update Information</h3>
                            </div>
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-3">

                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                                        <input id="itemName" name="itemName"
                                            type="text" defaultValue={singeFish.itemName} autoComplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-2 ">
                                        <label htmlFor="buyPricePerKG" className="block text-sm font-medium text-gray-700">Buy Price</label>
                                        <input type={"text"} id="buyPricePerKG" name="buyPricePerKG" autoComplete="buyPricePerKG" defaultValue={singeFish.buyPricePerKG} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="sellPricePerKG" className="block text-sm font-medium leading-6 text-gray-900">Sell Price</label>
                                        <div className="">
                                            <input defaultValue={singeFish.sellPricePerKG} type="text" name="sellPricePerKG" id="sellPricePerKG" className="block w-full text-center rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="col-span-6 sm:col-span-2">
                                        <label htmlFor="peaceStockQty" className="block text-sm font-medium text-gray-700">Fish Stock Qty</label>
                                        <input id="peaceStockQty" name="peaceStockQty"
                                            type="text" autoComplete="peaceStockQty" defaultValue={singeFish.peaceStockQty} className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

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
                </label>
            </label>
        </>
    )
}

export default EditEntryModal