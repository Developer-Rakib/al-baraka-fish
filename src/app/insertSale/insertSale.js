'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import moment, { fn } from "moment";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import toast from "react-hot-toast";
import SingelSaleTable from "./SingelSaleTable";

export default function SalesTable({ salesData, setSalesData, handleDelete }) {
    const today = moment().format('DD MMM yyyy');

    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);
    let totalSales = 0;
    let totalKG = 0;
    let totalProfit = 0;


    const tableRef = useRef();


    const handleDownloadPDF = async () => {
        const element = tableRef.current;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.7); // Compress here

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
            heightLeft -= pageHeight;
        }

        pdf.save(`${today}.pdf`);

    };


    const exportToExcel = () => {
        // Create a worksheet from the table data
        const ws = XLSX.utils.json_to_sheet(salesData);

        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, 'Daily Sales');

        // Export the workbook as an Excel file
        XLSX.writeFile(wb, `${today}.xlsx`);
    };


    function deleteSale(id) {
        console.log(id);
        // axios.delete(`https://admin.mzamanbd.com/sales/${id}`)
        //     .then(res => {
        //         console.log(res);
        //     })
    }

    function handleInfoSave(e, sale) {
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

        // console.log(stockData);
        // date: date,
        // itemName: currentVariation?.type ? `${bookingData.itemName} ${currentVariation?.type}` : bookingData.itemName,
        // kg: parseFloat(bookingData.kg),
        // amount: parseFloat(bookingData.amount),
        // unitprice: parseFloat((parseFloat(bookingData.amount) / parseFloat(bookingData.kg)).toFixed(2)),
        // profit: parseFloat((parseFloat(bookingData.amount) - (currentVariation.buyPricePerKG * parseFloat(bookingData.kg))).toFixed(2)),
        // note: ""

        let editedData = {
            date: sale.date,
            itemName: stockData.itemName,
            kg: parseFloat(stockData.kg),
            amount: parseFloat(stockData.amount),
            unitprice: parseFloat((parseFloat(stockData.amount) / parseFloat(stockData.kg)).toFixed(2)),
            profit: parseFloat(stockData.profit),
            note: sale.note
        }

        // console.log(editedData);
        // toast.success("Entry updated")
        axios.put(`https://admin.mzamanbd.com/sale/update/${sale._id}`, editedData)
            .then(data => {
                // console.log(data.data);
                if (data.data.modifiedCount > 0) {
                    toast.success(`${editedData.itemName} is successfully updated`)
                    setSalesData(prev =>
                        prev.map(item => item._id === sale._id ? { ...editedData, _id: sale._id } : item)
                    );
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
        <div className="w-[98%] sm:max-w-4xl mx-auto sm:p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-center font-semibold text-xl text-gray-600 mb-1 mt-5 sm:mt-0">Today Sales</h1>
            <div className="mb-2 text-right">
                {/* <button
                    onClick={handleDownloadPDF}
                    className="px-1.5 py-1 text-xs mr-1 bg-blue-600 text-white rounded"
                >
                    Download PDF
                </button> */}

                <button
                    onClick={exportToExcel}
                    className="px-1.5 py-1 text-xs bg-green-600 text-white rounded"
                >
                    Export to Excel
                </button>
            </div>
            <div ref={tableRef} className="overflow-x-auto">
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 border dark:bg-gray-700 dark:text-gray-400">
                        <tr className="">
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3">

                            </th>
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] border  sm:py-3">Date</th>
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] border sm:py-3">Fish Type</th>
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] border  sm:py-3">Quantity (kg)</th>
                            {/* <th scope="col" className="py-2 sm:text-[12px] text-[9px] border  sm:py-3">Unit Price</th> */}
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] border  sm:py-3">Amount ($)</th>
                            <th scope="col" className="py-2 sm:text-[12px] text-[9px] border  sm:py-3">Profit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {salesData.length > 0 ? (
                            salesData.map((sale, index) => {
                                totalSales = totalSales + sale.amount;
                                totalKG = totalKG + sale.kg;
                                totalProfit = totalProfit + sale.profit;

                                return <SingelSaleTable
                                    key={index}
                                    sale={sale}
                                    index={index}
                                    handleInfoSave={handleInfoSave}
                                    toggleModal={toggleModal}
                                    isModalOpen={isModalOpen}
                                ></SingelSaleTable>
                            }
                            )
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">No sales data available</td>
                            </tr>
                        )}
                        <tr className="text-center hover:bg-gray-100 transition">
                            <td scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3"></td>
                            <td scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3"></td>
                            <td scope="col" className="py-2 sm:text-[12px] text-[9px]  sm:py-3"></td>
                            <td scope="col" className="py-2 sm:text-[13px] text-[9px] font-bold sm:py-3">= {parseFloat(totalKG).toFixed(2)}kg</td>
                            <td scope="col" className="py-2 sm:text-[13px] text-[9px] font-bold sm:py-3">= {totalSales}</td>
                            <td scope="col" className="py-2 sm:text-[13px] text-[9px] font-bold sm:py-3">= {parseFloat(totalProfit).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}
