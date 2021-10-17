import { useTable } from 'react-table'

export default function ReactTable({columns, data} : {columns: any, data: any}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    // Render the UI for your table
    return (
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                // {...column.getHeaderProps()}
                                className={`px-3 py-3 text-left text-sm text-green-500 uppercase tracking-wider `}>
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>

            {
                data.length > 1 ? (
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} key={index} className="border-b">
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()} className="px-3 py-2 whitespace-nowrap">
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tbody {...getTableBodyProps()}>
                        <tr className="border-b">
                            <td colSpan={columns.length} className="px-3 text-sm text-gray-700 text-center py-2 whitespace-nowrap">
                                No data available in table
                            </td>
                        </tr>
                    </tbody>
                )
            }
        </table>
    )
}
