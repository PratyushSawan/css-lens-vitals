/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, CheckIcon, QuestionMarkCircleIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';


// Define the data types for the table
interface Feature {
    name: string;
    baseline: string;
    isInterop?: boolean;
    availability: {
        chrome: boolean;
        edge: boolean;
        firefox: boolean;
        safari: boolean;
    };
    wpt?: string;
    usage: string;
}

// Reusable icons for browsers
const browserIcons: { [key: string]: string } = {
    chrome: 'https://cdn.jsdelivr.net/npm/@browser-logos/chrome@1.0.0/chrome_64x64.png',
    edge: 'https://cdn.jsdelivr.net/npm/@browser-logos/edge@1.0.0/edge_64x64.png',
    firefox: 'https://cdn.jsdelivr.net/npm/@browser-logos/firefox@1.0.0/firefox_64x64.png',
    safari: 'https://cdn.jsdelivr.net/npm/@browser-logos/safari@1.0.0/safari_64x64.png',
};

interface TableComponentProps {
    data: any;
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');


    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedFeatures = [...data].sort((a, b) => {
        if (sortColumn) {
            const aValue = (a as any)[sortColumn] || '';
            const bValue = (b as any)[sortColumn] || '';
            if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
    });

    return (

        <div className="p-4 md:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200">
            <div className="overflow-x-auto rounded-lg shadow-lg">
                {/* <h1>{feature_Availability}</h1> */}
                <table className="min-w-full bg-white dark:bg-gray-800 text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 dark:bg-gray-700">
                            <th className="p-4 text-left font-semibold">
                                <button onClick={() => handleSort('prop')} className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none">
                                    <span>Feature</span>
                                    {sortColumn === 'prop' && (
                                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${sortDirection === 'asc' ? '' : 'rotate-180'}`} />
                                    )}
                                </button>
                            </th>
                            <th className="p-4 text-left font-semibold">
                                <button onClick={() => handleSort('baseline')} className="flex items-center space-x-1 hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none">
                                    <span>↓ Baseline</span>
                                </button>
                            </th>
                            <th className="p-4 text-center font-semibold" colSpan={4}>Availability</th>

                            {/* <th className="p-4 text-center font-semibold" colSpan={4}>WPT</th>
                            <th className="p-4 text-left font-semibold">Usage</th> */}

                        </tr>

                        {/* <tr className="bg-gray-100 dark:bg-gray-700">
                            <th></th>
                            <th></th>
                            <th className="p-2 text-center">
                                <div className="flex justify-center space-x-1 items-center">
                                    <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </th>
                            <th className="p-2 text-center">
                                <div className="flex justify-center space-x-1 items-center">
                                    <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </th>
                            <th className="p-2 text-center">
                                <div className="flex justify-center space-x-1 items-center">
                                    <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </th>
                            <th className="p-2 text-center">
                                <div className="flex justify-center space-x-1 items-center">
                                    <ChevronDownIcon className="w-4 h-4 transform rotate-180" />
                                    <ChevronDownIcon className="w-4 h-4" />
                                </div>
                            </th>
                            <th className="p-2 text-center">
                                <img src={browserIcons.chrome} alt="Chrome" className="w-6 h-6 mx-auto" />
                            </th>
                            <th className="p-2 text-center">
                                <img src={browserIcons.edge} alt="Edge" className="w-6 h-6 mx-auto" />
                            </th>
                            <th className="p-2 text-center">
                                <img src={browserIcons.firefox} alt="Firefox" className="w-6 h-6 mx-auto" />
                            </th>
                            <th className="p-2 text-center">
                                <img src={browserIcons.safari} alt="Safari" className="w-6 h-6 mx-auto" />
                            </th>
                            <th></th>
                        </tr> */}
                    </thead>
                    <tbody>
                        {sortedFeatures.slice(0, 50).map((feature, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <td className="p-4">
                                    <span className="text-blue-600 dark:text-blue-400 font-medium">{feature.prop}</span>
                                    {feature.featureData && feature.featureData.group && (
                                        <span className="ml-2 px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-blue-8">
                                            {feature.featureData.group}
                                        </span>
                                    )}
                                </td>
                                {feature.featureData && (
                                    <>
                                        <td className="p-4 text-center">
                                            <Image src="/baseline-widely-icon.png" alt="Baseline Widely Icon" width={16} height={16} />
                                        </td>

                                        {feature.featureData.status.support.chrome && <td className="p-4 text-center">
                                            <img src={browserIcons.chrome} alt="Chrome" className="w-6 h-6 mx-auto" />
                                        </td>}

                                        {feature.featureData.status.support.edge && <td className="p-4 text-center">
                                            <img src={browserIcons.edge} alt="Edge" className="w-6 h-6 mx-auto " />
                                        </td>}

                                        {feature.featureData.status.support.firefox && <td className="p-4 text-center">
                                            <img src={browserIcons.firefox} alt="Firefox" className="w-6 h-6 mx-auto" />
                                        </td>}

                                        {feature.featureData.status.support.safari && <td className="p-4 text-center">
                                            <img src={browserIcons.safari} alt="Safari" className="w-6 h-6 mx-auto" />
                                        </td>}
                                    </>
                                )}

                                {/* <td className="p-4 text-center">{feature.wpt || (
                                    <InformationCircleIcon className="w-5 h-5 text-gray-400 mx-auto" />
                                )}</td>
                                <td className="p-4 text-center">{feature.wpt || (
                                    <InformationCircleIcon className="w-5 h-5 text-gray-400 mx-auto" />
                                )}</td>
                                <td className="p-4 text-center">{feature.wpt || (
                                    <InformationCircleIcon className="w-5 h-5 text-gray-400 mx-auto" />
                                )}</td>
                                <td className="p-4 text-center">{feature.wpt || (
                                    <InformationCircleIcon className="w-5 h-5 text-gray-400 mx-auto" />
                                )}</td>
                                <td className="p-4 text-left">
                                    {feature.usage}
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableComponent;
