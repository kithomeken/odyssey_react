import React, { Fragment, useState } from 'react'
import { useTable, usePagination } from 'react-table'
import { Listbox, Transition } from '@headlessui/react'

export default function ReactTable({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    )

    let pageCountArray = []
    let dataLength = data.length
    let firstItemOnPageFromData = (pageSize * pageIndex) + 1
    let lastItemOnPageFromData = (pageCount !== (pageIndex + 1)) ? ((pageSize * pageIndex) + pageSize) : (dataLength)

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    function mapPageCountToArray() {
        var i = 0
        while (++i <= pageCount) pageCountArray.push(i);
    }

    return (
        <>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>

            <div className="w-12/12 mb-3 flex items-center align-middle">
                <div className="">
                    <select
                        className="relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize} className="absolute z-10 mr-2 rounded mt-1 w-full bg-white shadow-lg max-h-56 hover:bg-green-400 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table {...getTableProps()} className="w-full divide-y divide-gray-200">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column, index) => (
                                <th
                                    // {...column.getHeaderProps()}
                                    key={index}
                                    className={`px-3 py-3 text-left text-xs text-emerald-600 uppercase font-normal tracking-wider `}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={index} className="border-b hover:bg-gray-100">
                                {row.cells.map((cell, indice) => {
                                    return (
                                        <td {...cell.getCellProps()} key={indice} className="px-3 py-2 whitespace-nowrap">
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="pagination mt-6">
                <div className="bg-white px-4 py-3 flex items-center justify-between sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{firstItemOnPageFromData}</span> to <span className="font-medium">{lastItemOnPageFromData}</span> of{' '} <span className="text-green-600 font-medium">{dataLength}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="relative z-0 inline-flex rounded-md text-green-700 font-medium" aria-label="Pagination">
                                <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className="relative inline-flex items-center px-2 py-1 shadow-sm rounded-l border border-gray-300 bg-white text-sm hover:bg-gray-100">
                                    <span className="">Previous</span>
                                </button>

                                {// Run to map the number of pages 
                                    // into an array for loop rendering
                                    mapPageCountToArray()
                                }

                                {
                                    pageCount <= 10 ? (
                                        <>
                                            {
                                                pageCountArray.map((pageNumber, index) => {
                                                    return (
                                                        <>
                                                            <button
                                                                type="button"
                                                                key={index}
                                                                onClick={e => {
                                                                    gotoPage(pageNumber - 1)
                                                                }}
                                                                className={
                                                                    classNames(
                                                                        (pageNumber - 1) === pageIndex ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300  hover:bg-gray-100',
                                                                        'z-10 relative px-3 py-1 border text-xs font-medium'
                                                                    )
                                                                }>
                                                                {pageNumber}
                                                            </button>
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    ) : (
                                        <>
                                            {
                                                pageCountArray.map((pageNumber, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                pageNumber < 6 ? (
                                                                    <button
                                                                        type="button"
                                                                        key={index}
                                                                        onClick={e => {
                                                                            gotoPage(pageNumber - 1)
                                                                        }}
                                                                        className={
                                                                            classNames(
                                                                                (pageNumber - 1) === pageIndex ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300  hover:bg-gray-100',
                                                                                'z-10 relative px-3 py-1 border text-xs font-medium'
                                                                            )
                                                                        }>
                                                                        {pageNumber}
                                                                    </button>
                                                                ) : null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }

                                            <span className="z-10 relative px-3 py-1 border text-xs font-medium bg-white border-gray-300  hover:bg-gray-100">
                                                ...
                                            </span>

                                            {
                                                pageCountArray.map((pageNumber, index) => {
                                                    return (
                                                        <>
                                                            {
                                                                pageNumber === pageCount ? (
                                                                    <button
                                                                        type="button"
                                                                        key={index}
                                                                        onClick={e => {
                                                                            gotoPage(pageNumber - 1)
                                                                        }}
                                                                        className={
                                                                            classNames(
                                                                                (pageNumber - 1) === pageIndex ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300  hover:bg-gray-100',
                                                                                'z-10 relative px-3 py-1 border text-xs font-medium'
                                                                            )
                                                                        }>
                                                                        {pageNumber}
                                                                    </button>
                                                                ) : null
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                }

                                <button
                                    onClick={() => nextPage()}
                                    disabled={!canNextPage}
                                    className="relative inline-flex items-center px-2 py-1 rounded-r border border-gray-300 bg-white text-sm hover:bg-gray-100">
                                    <span className="">Next</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
