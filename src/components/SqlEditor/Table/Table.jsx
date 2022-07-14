import React from "react";

import './Table.css'

const Table = ({ columns, data }) => (
    <div className="shadow overflow-auto border-b border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 table">
            <thead className="thead">
                <tr>
                    {columns.map((column) => (
                        <th
                            scope="col"
                            className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider head-col"
                            key={column.accessor}
                        >
                            <span>{column.Header}</span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white text-black divide-y divide-gray-200">
                {data.map((row) => (
                    <tr key={row[0]}>
                        {Object.keys(row).map((k) => (
                            <td key={k}>{row[k]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
)

export default Table
