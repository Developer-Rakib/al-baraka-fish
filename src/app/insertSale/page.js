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
    const [fishStock, setfishStock] = useState([])
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const today = moment().format('DD MMM yyyy');
        axios.get(`https://admin.mzamanbd.com/sales/${today}`) // Replace with your API URL
            .then(response => setSalesData(response.data))
            .catch(error => console.error("Error fetching sales data:", error));

        // axios.get("https://admin.mzamanbd.com/fishStock")
        axios.get("fishStock.json")
            .then(res => setfishStock(res.data))
            .catch(error => console.error("Error fetching sales data:", error));
    }, [salesData]);


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


    // fish stock format

    // {
    //     [
    //         {
    //             "itemName": "Rui 1 UP",
    //             "buyPricePerKG": 8.25,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 16
    //         },
    //         {
    //             "itemName": "Rui 2 UP",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 20
    //         },
    //         {
    //             "itemName": "Rui 3 UP",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 14,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Rui 4 UP",
    //             "buyPricePerKG": 10,
    //             "sellPricePerKG": 14,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Rui 5 UP",
    //             "buyPricePerKG": 11.5,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Rui 6 UP",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 1 UP",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 2 UP",
    //             "buyPricePerKG": 10,
    //             "sellPricePerKG": 14,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 3 UP",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 4 UP",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 5 UP",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Katla 6 UP",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 0.8 -1",
    //             "buyPricePerKG": 8.50,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 1 UP",
    //             "buyPricePerKG": 8.75,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 1.5 - 2",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 2 UP",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 3 UP",
    //             "buyPricePerKG": 10.5,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 4 UP",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pangas 6 UP",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Carfu 1.5 - 2",
    //             "buyPricePerKG": 9.5,
    //             "sellPricePerKG": 14,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Carfu 5 UP",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 0.3 - 0.5",
    //             "buyPricePerKG": 23,
    //             "sellPricePerKG": 30,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 0.5 - 8",
    //             "buyPricePerKG": 33,
    //             "sellPricePerKG": 40,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 0.8 - 1",
    //             "buyPricePerKG": 43,
    //             "sellPricePerKG": 50,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 1 - 1.2",
    //             "buyPricePerKG": 53,
    //             "sellPricePerKG": 60,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 1.2 - 1.5",
    //             "buyPricePerKG": 53,
    //             "sellPricePerKG": 60,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha 1.5 UP",
    //             "buyPricePerKG": 70,
    //             "sellPricePerKG": 75,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha Nona",
    //             "buyPricePerKG": 16,
    //             "sellPricePerKG": 22,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Hilsha Egg",
    //             "buyPricePerKG": 25.6,
    //             "sellPricePerKG": 32,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Telapiya",
    //             "buyPricePerKG": 13,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Shor Puti 0.5 - 0.8",
    //             "buyPricePerKG": 11,
    //             "sellPricePerKG": 14,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Shor Puti 0.8 - 1.2",
    //             "buyPricePerKG": 11.5,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Shor Puti 1 UP",
    //             "buyPricePerKG": 12,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Shor Puti Packet",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "D-Puti Packet",
    //             "buyPricePerKG": 5.75,
    //             "sellPricePerKG": 8,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Baim Big",
    //             "buyPricePerKG": 30,
    //             "sellPricePerKG": 34,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Baim Small",
    //             "buyPricePerKG": 19,
    //             "sellPricePerKG": 24,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Star Baim",
    //             "buyPricePerKG": 16,
    //             "sellPricePerKG": 20,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Poa",
    //             "buyPricePerKG": 9,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Koi Packet",
    //             "buyPricePerKG": 15.5,
    //             "sellPricePerKG": 17,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Kaski",
    //             "buyPricePerKG": 3.54,
    //             "sellPricePerKG": 6,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Singri S. Packet",
    //             "buyPricePerKG": 6.25,
    //             "sellPricePerKG": 8,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Singri 1/2",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Singri 15",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Shoil",
    //             "buyPricePerKG": 20,
    //             "sellPricePerKG": 24,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Aeil",
    //             "buyPricePerKG": 17,
    //             "sellPricePerKG": 22,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mirka 1.5 - 20",
    //             "buyPricePerKG": 11.5,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mirka 2 UP",
    //             "buyPricePerKG": 13,
    //             "sellPricePerKG": 17,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mirka 3 UP",
    //             "buyPricePerKG": 14.5,
    //             "sellPricePerKG": 18,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mirka 4 UP",
    //             "buyPricePerKG": 15,
    //             "sellPricePerKG": 18,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Rup Chanda",
    //             "buyPricePerKG": 10,
    //             "sellPricePerKG": 16,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Boal 1 UP",
    //             "buyPricePerKG": 16,
    //             "sellPricePerKG": 19,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Pabda Packet",
    //             "buyPricePerKG": 22,
    //             "sellPricePerKG": 28,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Loitta Packet",
    //             "buyPricePerKG": 8,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Loitta Dry",
    //             "buyPricePerKG": 5.4,
    //             "sellPricePerKG": 8,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Buti Packet",
    //             "buyPricePerKG": 9.16,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mola Packet",
    //             "buyPricePerKG": 4.79,
    //             "sellPricePerKG": 8,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Capila Packet",
    //             "buyPricePerKG": 5,
    //             "sellPricePerKG": 8,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Kajuli Packet",
    //             "buyPricePerKG": 10,
    //             "sellPricePerKG": 13,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Nola Packet",
    //             "buyPricePerKG": 8,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mix Packet",
    //             "buyPricePerKG": 6.45,
    //             "sellPricePerKG": 11,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Sing Packet",
    //             "buyPricePerKG": 18,
    //             "sellPricePerKG": 22,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Tangra Packet",
    //             "buyPricePerKG": 9.2,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Rui Egg Packet",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 0,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Taki Packet",
    //             "buyPricePerKG": 9.33,
    //             "sellPricePerKG": 12,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Chicken Small",
    //             "buyPricePerKG": 6.5,
    //             "sellPricePerKG": 10,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Chicken Big",
    //             "buyPricePerKG": 18.75,
    //             "sellPricePerKG": 30,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Beef",
    //             "buyPricePerKG": 17.77,
    //             "sellPricePerKG": 24,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Duck",
    //             "buyPricePerKG": 38.33,
    //             "sellPricePerKG": 45,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Mola Dry",
    //             "buyPricePerKG": 3.4,
    //             "sellPricePerKG": 6,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Suri Dry",
    //             "buyPricePerKG": 10.5,
    //             "sellPricePerKG": 15,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Sefa Dry",
    //             "buyPricePerKG": 5.6,
    //             "sellPricePerKG": 10,
    //             "peaceStockQty": 10
    //         },
    //         {
    //             "itemName": "Fish Cuting",
    //             "buyPricePerKG": 0,
    //             "sellPricePerKG": 20,
    //             "peaceStockQty": 10000
    //         }
    //     ]
    // }






    const fishNames = fishStock?.map(fishS => fishS.itemName);

    // console.log(fishNames);
    // let qtyCount = 1;

    // let itemString = itemName.map(itSt => `<option>${itSt}</option>`,)
    let fishNameInner = fishNames.map((itSt, i) => <option key={i}>{itSt}</option>,)



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
        // const item = {
        //     itemName: "Koral",
        //     variation: [
        //         { type: "1 UP", buyPricePerKG: 18, sellPricePerKG: 24, peaceStockQty: 19 },
        //         { type: "2 UP", buyPricePerKG: 19, sellPricePerKG: 25, peaceStockQty: 9 },
        //         { type: "1.5 2", buyPricePerKG: 18.5, sellPricePerKG: 24, peaceStockQty: 11 },
        //         { type: "3 UP", buyPricePerKG: 19.5, sellPricePerKG: 25, peaceStockQty: 6 }
        //     ]
        // };

        // console.log(findBestVariation(kg).buyPricePerKG); // Fallback to "1 UP"




        // console.log(currentStock);
        // const currentFishType = currentStock.variation.map(cf => {
        //     // console.log(cf.type.split(" ")[1]);
        //     const kg = parseFloat(bookingData.kg)
        //     const minNumber = parseFloat(cf.type.split(" ")[0]);
        //     const maxNumber = parseFloat(cf.type.split(" ")[0]);
        //     // if ( >= ) {

        //     // }
        //     // if (cf.type.split(" ")[1] === "UP") {
        //     //     // console.log(cf.type.split(" ")[1]);

        //     // }
        // })

        const buyPrice = currentStock.variation ? findBestVariation(kg).buyPricePerKG : currentStock.buyPricePerKG


        // const date = Date()

        let finalData = {
            date: date,
            itemName: bookingData.itemName,
            kg: parseFloat(bookingData.kg),
            amount: parseFloat(bookingData.amount),
            unitprice: parseFloat((parseFloat(bookingData.amount) / parseFloat(bookingData.kg)).toFixed(2)),
            profit: parseFloat((parseFloat(bookingData.amount) - (buyPrice * parseFloat(bookingData.kg))).toFixed(2)),
            note: ""
        }
        console.log(finalData);
        // console.log(finalData);
        axios.post(`https://admin.mzamanbd.com/sales`, finalData).then(data => {
            // console.log(data.data.success);
            // console.log(data.data);
            if (data.data.success) {
                toast.success(`${data.data.message}`)
                e.target.reset();
                setSalesData(salesData)
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
                                        <select id="itemName" name="itemName" autoComplete="item-name" className="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            {fishNameInner}
                                        </select>
                                    </div>
                                </div>
                            </div>

                        </div>




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
