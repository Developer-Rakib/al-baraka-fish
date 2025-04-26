"use client"
import { useEffect, useState } from "react";
import moment from 'moment';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import Swal from 'sweetalert2';
import { FaPlusCircle } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SalesTable from "./insertSale";
import Link from "next/link";
// import from "./DailySales.js";

export default function AddSales() {
    const [startDate, setStartDate] = useState(new Date());
    // const [qtyCount, setQtyCount] = useState(1);
    const [currentFish, setCurrentFish] = useState()
    const [fishStock, setfishStock] = useState([])
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const today = moment().format('DD MMM yyyy');
        axios.get(`https://admin.mzamanbd.com/sales/${today}`) // Replace with your API URL
            .then(response => setSalesData(response.data))
            .catch(error => console.error("Error fetching sales data:", error));

    }, []);
    // console.log(salesData);

    useEffect(() => {
        // axios.get("https://admin.mzamanbd.com/fishStock")
        axios.get("https://admin.mzamanbd.com/fishStock")
            .then(res => setfishStock(res.data))
            .catch(error => console.error("Error fetching sales data:", error));
    }, []);


    function handleDelete(sale) {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete this sale data?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(order._id);

                axios.delete(`https://admin.mzamanbd.com/sale/${sale._id}`)
                    .then(data => {
                        // console.log(data);
                        if (data.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                `Sale data is deleted!`,
                                'success'
                            )
                            const restSalesData = salesData.filter(o => sale._id !== o._id);
                            setSalesData(restSalesData)
                        }
                        else {
                            toast.error('Somthing is wrong !')
                        }
                    })

            }
        })
    }








    const fishNames = fishStock?.map(fishS => fishS.itemName);
    let fishNameInner = fishNames.map((itSt, i) => <option key={i}>{itSt}</option>,)



    let fishVariationInner = currentFish?.variation?.map((itSt, i) => <option key={i}>{itSt?.type}</option>,) || null

    // console.log(currentFish?.variation);
    // console.log(fishVariationInner);



    // console.log(fishNames);
    // let qtyCount = 1;

    // let itemString = itemName.map(itSt => `<option>${itSt}</option>`,)



    function handleSelectFish(e) {
        // console.log(e.target.value);
        const currentFishFind = fishStock.find(fs => fs.itemName === e.target.value)
        setCurrentFish(currentFishFind)

    }


    function handleClear(e) {
        e.target.form.reset();
    }



    // let deleteBtns = document.querySelectorAll("#deleteQty");
    // for (const deleteBtn of deleteBtns) {
    //   deleteBtn.addEventListener("click", function () {
    //     deleteBtn.parentNode.parentNode.style.display = "none";
    //     // deleteBtn.parentNode.parentNode.parentNode.removeChild(deleteBtn.parentNode.parentNode);

    //   })
    // }


    function hangleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formatedData = Array.from(formData.entries())
        // console.log(formData);


        let bookingData = {}
        formatedData.map((data) => {
            let obj = {
                ...bookingData,
                [data[0]]: data[1],
            }
            bookingData = obj
        })

        // console.log(bookingData.variation);


        let date = moment(startDate).format('DD MMM yyyy');
        const currentStock = fishStock.find(data => bookingData.itemName === data.itemName)
        const kg = parseFloat(bookingData.kg)

        function findBestVariation(weight) {
            // Max weight for "UP" variations should be considered 1000 grams (1 kg)
            const parsed = currentStock.variation.map(v => {
                const [minStr, maxStr] = v.type.split(" ");
                const min = parseFloat(minStr);
                const max = maxStr === "UP" ? 1000 : parseFloat(maxStr); // 1000 grams for "UP"

                return {
                    ...v,
                    min,
                    max,
                    range: max - min
                };
            });

            // Filter variations that the weight fits into
            const validMatches = parsed.filter(v => weight >= v.min && weight <= v.max);

            // If no specific match is found, fall back to the lowest range ("1 UP")
            if (validMatches.length === 0) {
                const fallbackMatch = parsed.find(v => weight <= v.max);
                if (fallbackMatch) {
                    // console.log("Fallback Match:", fallbackMatch);
                    return fallbackMatch;
                }
                console.log("No valid match found.");
                return null;
            }

            // Sort by the tightest range to pick the best variation
            validMatches.sort((a, b) => a.range - b.range);

            const bestMatch = validMatches[0];
            // console.log("✅ Best Match:", bestMatch);
            return bestMatch;
        }



        const currentVariation = currentStock.variation ?
            (
                bookingData.variation === "Select" ?
                    findBestVariation(kg)
                    :
                    currentStock.variation.find(cs => cs.type === bookingData.variation)
            )
            :
            currentStock;

        // console.log(currentVariation);



        let finalData = {
            date: date,
            itemName: currentVariation?.type ? `${bookingData.itemName} ${currentVariation?.type}` : bookingData.itemName,
            kg: parseFloat(bookingData.kg),
            amount: parseFloat(bookingData.amount),
            unitprice: parseFloat((parseFloat(bookingData.amount) / parseFloat(bookingData.kg)).toFixed(2)),
            profit: parseFloat((parseFloat(bookingData.amount) - (currentVariation.buyPricePerKG * parseFloat(bookingData.kg))).toFixed(2)),
            note: ""
        }
        // console.log(finalData);
        axios.post(`https://admin.mzamanbd.com/sales`, finalData).then(data => {
            // console.log(data.data.success);
            // console.log(data.data);
            if (data.data.success) {
                toast.success(`${data.data.message}`)
                e.target.reset();
                setSalesData(prev => [...prev, { ...finalData, _id: data.data.insertedId || Date.now() }]);
                // console.log(data.data.insertedId);
                // hey buddy listen carefully ! when i post new sales, i want to load in my ui with my new sales
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${data.data.message}`,
                });
                // toast.error(`${data.data.message}`)
            }
        })


    }
    return (
        <div className='mb-8 mt-20  min-h-screen'>
            <Link className="text-[#426B69] underline text-right block" href={"/insertSale/dailySale"}>View DailySale</Link>
            <form onSubmit={(e) => hangleSubmit(e)} className='  mx-auto' >
                <div className="text-center">

                    {/* <p  className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}


                    <div className='flex  justify-center  flex-col sm:flex-row sm:justify-center sm:items-end'>


                        <h2 className="leading-7 inline text-teal-700 mb-4 mr-3 text-xl">Insert Sale Here:</h2>

                        <div className="w-full my-2 sm:w-[120px]  mx-3">

                            <DatePicker
                                className='border-2 rounded-md w-32 text-center py-1.5 text-gray-700'
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                required
                                form="external-form"
                                showYearDropdown
                                dateFormat="dd MMM yyy"
                                yearDropdownItemNumber={15}
                                scrollableYearDropdown
                            />
                        </div>




                        <div >
                            <div className='flex'>
                                <div className="w-full my-2 sm:w-[140px]  sm:mx-2">
                                    <label htmlFor="itemName" className="block text-sm font-medium leading-6 text-gray-900">Fish Name</label>
                                    <div className="">
                                        <select onChange={handleSelectFish} id="itemName" name="itemName" autoComplete="item-name" className="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option >Select</option>
                                            {fishNameInner}
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>




                        {
                            fishVariationInner &&
                            <div>
                                <div className='flex'>
                                    <div className="w-full my-2 sm:w-[140px]  sm:mx-2">
                                        <label htmlFor="variation" className="block text-sm font-medium leading-6 text-gray-900">Variation</label>
                                        <div className="">
                                            <select id="variation" name="variation" autoComplete="item-name" className="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option >Select</option>
                                                {fishVariationInner}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }





                        <div className="w-full my-2 sm:w-[120px]  sm:mx-2">
                            <label htmlFor="kg" className="block text-sm font-medium leading-6 text-gray-900">KG / QTY</label>
                            <div className="">
                                <input required type="number" step="0.01" name="kg" id="kg" className="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="w-full my-2 sm:w-[120px]  sm:mx-2">
                            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
                            <div className="">
                                <input required type="number" step="0.01" name="amount" id="amount" autoComplete="address-level2" className="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        <div className="flex my-2 ml-4 items-center justify-center">
                            <button id='submitBtn' type="submit" className="rounded-md mr-1 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Submit</button>
                            <button onClick={(e) => handleClear(e)} type="button" className="rounded-md border text-indigo-600 px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-indigo-500 hover:text-white">Clear</button>
                        </div>

                        {/* <div className="w-full my-2 sm:w-[120px]  mx-2">
                            <label htmlFor="unitPrice" className="block text-sm font-medium leading-6 text-gray-900">Unit Price</label>
                            <div className="">
                                <input required step="0.01" type="number" name="unitPrice" id="unitPrice" autoComplete="address-level2" className="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div> */}

                        {/* <div className="w-full my-2 sm:w-[120px]  mx-2">
                            <label htmlFor="discount" className="block text-sm font-medium leading-6 text-gray-900">Discount</label>
                            <div className="">
                                <input type="number" name="discount" id="discount" autoComplete="address-level2" className="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div> */}







                    </div>


                </div>


            </form>

            <SalesTable
                salesData={salesData}
                handleDelete={handleDelete}
            ></SalesTable>
        </div>
    );
}
