/* eslint-disable */

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import TableComponent from "./TableData";


export default function Result({ url }: { url: string }) {
    const [loading, isLoading] = useState(false);
    const [result, setResult] = useState({});
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        isLoading(true);
        handleAnalyze(url);
    }, [url])

    const handleAnalyze = async (url: string) => {
        try {
            const responce = await axios.post('/api/analyze', { url: url })
            console.log(responce.data);
            setResult(responce.data.message);
        } catch (err) {
            console.log(err)
        }
        isLoading(false);
    }

    return (
        <>
            {
                loading ?
                    (<div className="bg-white shadow-lg rounded-xl p-6">
                        <h2 className="text-xl font-bold text-gray-800">Analysis Result</h2>
                        <p className="text-gray-600 mt-2">Analyzing: {url}</p>
                        {/* Your actual result logic here */}
                    </div>) : (
                        <div className="min-h-auto">
                            <main className="container mx-auto p-4 md:p-8 flex-grow">
                                <section className="mb-10">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                        We have successfully scanned the provided URL, fetched all its live stylesheets, and compiled the following Web Platform Baseline report.
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <div className=" p-6 rounded-xl shadow-lg transition-all duration-300 border-l-4 border-green-500"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-xl">Widely Available</h3>
                                                <Image src="/baseline-widely-icon.png" alt="Baseline Widely Icon" width={32} height={32} />
                                            </div>
                                            <div className="flex items-center mb-4 space-x-2">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-green-400 text-black-800 "
                                                >
                                                    High Support
                                                </span>
                                            </div>

                                            <div className="flex items-end space-x-3 mb-3">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <p className="text-5xl font-bold text-gray-900">{(result as any).summary?.high}</p>
                                                <span
                                                    className="px-1 text-sm font-medium rounded-md bg-gray-400 text-green-100"
                                                >
                                                    CSS Found
                                                </span>
                                            </div>

                                            <p className="text-sm mb-2 opacity-80">
                                                These are the rock-solid features of the web. They have been supported by all major browsers for over 30 months.
                                            </p>

                                            <div className="flex justify-end mt-2">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <button onClick={(e) => setTableData((result as any)?.properties.high)} type="button" className="py-0.5 px-2 me-2 mb-2 text-sm font-medium text-green-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">View List→</button>
                                            </div>
                                        </div>

                                        <div className=" p-6 rounded-xl shadow-lg transition-all duration-300 border-l-4 border-blue-500"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-xl">Newly Available</h3>
                                                <Image src="/baseline-newly-icon.png" alt="Baseline Newely Available Icon" width={32} height={32} />
                                            </div>
                                            <div className="flex items-center mb-4 space-x-2">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-400 text-green-80"
                                                >
                                                    Modern Support
                                                </span>
                                            </div>

                                            <div className="flex items-end space-x-3 mb-3">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <p className="text-5xl font-bold text-gray-900">{(result as any).summary?.low}</p>
                                                <span
                                                    className="px-1 text-sm font-medium rounded-md bg-gray-400 text-green-100"
                                                >
                                                    CSS Found
                                                </span>
                                            </div>

                                            <p className="text-sm mb-2 opacity-80">These are modern, cutting-edge features supported in the latest versions of all major browsers. They have not yet reached the 30-month milestone.</p>

                                            <div className="flex justify-end mt-2">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <button onClick={(e) => setTableData((result as any)?.properties.low)} type="button" className="py-0.5 px-2 me-2 mb-2 text-sm font-medium text-blue-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">View List→</button>

                                            </div>
                                        </div>

                                        <div className=" p-6 rounded-xl shadow-lg transition-all duration-300 border-l-4 border-orange-500"
                                        >
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-bold text-xl">Limited or Unknown</h3>
                                                <Image src="/baseline-limited-icon.png" alt="Baseline Limited Available Icon" width={32} height={32} />
                                            </div>
                                            <div className="flex items-center mb-4 space-x-2">
                                                <span
                                                    className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-400 text-black-800"
                                                >
                                                    Low Support
                                                </span>
                                            </div>

                                            <div className="flex items-end space-x-3 mb-3">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <p className="text-5xl font-bold text-gray-900">{(result as any).summary?.not_found}</p>
                                                <span
                                                    className="px-1 text-sm font-medium rounded-md bg-gray-400 text-green-100"
                                                >
                                                    CSS Found
                                                </span>
                                            </div>

                                            <p className="text-sm mb-2 opacity-80">These features are not part of the Baseline standard. They might be experimental, browser-specific (e.g., -webkit-), or non-standard.</p>

                                            <div className="flex justify-end mt-2">
                                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                                <button onClick={(e) => setTableData((result as any)?.properties.not_found)} type="button" className="py-0.5 px-2 me-2 mb-2 text-sm font-medium text-orange-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">View List→</button>

                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="mb-10">
                                    {tableData.length > 0 && <TableComponent data={tableData} />}
                                </section>
                            </main>
                        </div>
                    )
            }
        </>

    );
}
// interface CardProps {
//     item: { name: string; description: string; baseline: string; support: string };
//     color: string;
//     isDarkMode: boolean;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-c
const Card = ({ item, color, isDarkMode }: any) => (
    <div
        className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"
            } border-l-4 ${color}`}
    >
        <h3 className="font-bold text-xl mb-2">{item.name}</h3>
        <p className="text-sm mb-2 opacity-80">{item.description}</p>
        <div className="flex items-center space-x-2 mt-4">
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${item.baseline === "high"
                    ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                    }`}
            >
                {item.support} Support
            </span>
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${isDarkMode
                    ? "bg-slate-700 text-slate-300"
                    : "bg-slate-200 text-slate-700"
                    }`}
            >
                {item.baseline} Baseline
            </span>
        </div>
    </div>
);