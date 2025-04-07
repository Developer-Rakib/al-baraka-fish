"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white w-64 space-y-6 py-5 px-4 absolute md:relative md:translate-x-0 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-64"
                    } md:block`}
            >
                <h2 className="text-2xl font-bold text-center">Admin Panel</h2>
                <nav>
                    <Link href="/" className="block py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        🏠 Home
                    </Link>
                    <Link href="/admin" className="flex py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        <svg
                            width=""
                            height="24"
                            viewBox="0 0 30 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect x="3" y="3" width="8" height="8" rx="2" fill="#a33f05" />
                            <rect x="13" y="3" width="8" height="5" rx="2" fill="#b8b8b8" />
                            <rect x="13" y="10" width="8" height="10" rx="2" fill="#a33f05" />
                            <rect x="3" y="13" width="8" height="7" rx="2" fill="#b8b8b8" />
                        </svg>

                        Dashboard
                    </Link>
                    <Link href="/admin/CreateCourse" className="flex py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 30 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 19H20V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                                stroke="#0091ab"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M8 9H16"
                                stroke="#0091ab"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M8 13H12"
                                stroke="#0091ab"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M15 20H21"
                                stroke="#0091ab"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M18 17V23"
                                stroke="#0091ab"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>

                        Create Course
                    </Link>
                    <Link href="#" className="block py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        📂 Files
                    </Link>
                    <Link href="#" className="block py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        👤 Users
                    </Link>
                    <Link href="#" className="block py-2.5 px-4 rounded-lg hover:bg-gray-700">
                        ⚙️ Settings
                    </Link>
                    <Link href="#" className="block py-2.5 px-4 rounded-lg text-red-400 hover:bg-red-600">
                        🚪 Logout
                    </Link>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Mobile Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 bg-gray-800 text-white rounded-lg mb-4"
                >
                    ☰
                </button>

                {/* Page Content */}
                <h1 className="text-3xl font-bold text-gray-800">Welcome to the Admin Panel</h1>
                <p className="mt-2 text-gray-600">Manage your dashboard.</p>
                {children}
            </div>
        </div>
    );
}
