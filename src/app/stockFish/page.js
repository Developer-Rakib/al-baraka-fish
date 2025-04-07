"use client";
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import SingleFishStock from './SingleFishStock';
import { toast } from 'react-hot-toast';


export default function Inventory() {
    const [fishStock, setFishStock] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);


    useEffect(() => {
        axios.get(`https://admin.mzamanbd.com/fishStock`) // Replace with your API URL
            .then(response => setFishStock(response.data))
            .catch(error => console.error("Error fetching sales data:", error));

    }, []);
    // console.log(fishStock);


    function handleInfoSave(e) {
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

        console.log(editedData);
        // toast.success("Entry updated")
        axios.post(`https://admin.mzamanbd.com/fishStock/create`, editedData)
            .then(data => {
                // console.log(data.data);
                if (data.data.success) {
                    toast.success("Added fish in the stock")
                    toggleModal()
                    // document.getElementById('my-modal-4').checked = false;
                    // setFishStock(fishStock)
                    // setEditModal(false)
                }
                else {
                    toast.error("Something is wrong, please try again")
                }
            })
    }

    return (
        <div className='mt-32 min-h-screen'>


            <div className=''>
                {

                    fishStock.length > 0 ?

                        <div className='text-right'>


                            <button className="btn btn-primary text-white" onClick={toggleModal}>
                                Add Fish
                            </button>

                            {/* Modal */}
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="modal modal-open">
                                        <div className="modal-box">
                                            <form onSubmit={handleInfoSave} className='text-center'>
                                                <div className="shadow  overflow-hidden sm:rounded-md">
                                                    <div className="px-4 py-4 bg-gray-50 sm:px-6">
                                                        <h3 className="text-xl.
                                                         leading-6 font-medium text-gray-900">Insert Fish Information</h3>
                                                    </div>
                                                    <div className="px-4 py-5 bg-white sm:p-6">
                                                        <div className="grid grid-cols-6 gap-3">

                                                            <div className="col-span-6 sm:col-span-2">
                                                                <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
                                                                <input id="itemName" name="itemName"
                                                                    type="text" autoComplete="country-name" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                                                                />
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-2 ">
                                                                <label htmlFor="buyPricePerKG" className="block text-sm font-medium text-gray-700">Buy Price</label>
                                                                <input type={"text"} id="buyPricePerKG" name="buyPricePerKG" autoComplete="buyPricePerKG" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                />
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-2">
                                                                <label htmlFor="sellPricePerKG" className="block text-sm font-medium leading-6 text-gray-900">Sell Price</label>
                                                                <div className="">
                                                                    <input type="text" name="sellPricePerKG" id="sellPricePerKG" className="block w-full text-center rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                </div>
                                                            </div>
                                                            <div className="col-span-6 sm:col-span-2">
                                                                <label htmlFor="peaceStockQty" className="block text-sm font-medium text-gray-700">Fish Stock Qty</label>
                                                                <input id="peaceStockQty" name="peaceStockQty"
                                                                    type="text" autoComplete="peaceStockQty" className="text-center mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

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

                            <div className='w-[95%] mx-auto  sm:w-[60%] sm:px-6 px-2 pb-5'>

                                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3">

                                                </th>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px] sm:py-3">
                                                    Item Name
                                                </th>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3">
                                                    Buy Price
                                                </th>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                    Sell Price
                                                </th>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3 ">
                                                    Stock QTY
                                                </th>
                                                <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3 ">

                                                </th>
                                                {/* <th scope="col" className="py-2 sm:text-[12px] text-[9px] text-center sm:py-3">
                                                            QTY
                                                        </th> */}

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                fishStock.map((singleFish, i) => {

                                                    // console.log(order.status);
                                                    // pItem = { selname: "rakiv" }

                                                    // if (order.status === "Deliverd") {

                                                    // }


                                                    // console.log(count);
                                                    return <SingleFishStock
                                                        key={i}
                                                        i={i}
                                                        singleFish={singleFish}
                                                        setFishStock={setFishStock}
                                                        fishStock={fishStock}
                                                    ></SingleFishStock>
                                                }
                                                )
                                            }


                                        </tbody>
                                    </table>

                                </div>


                            </div >

                        </div>
                        :
                        <p className='text-center'>Loading!</p>
                }
            </div>

        </div >
    );
}