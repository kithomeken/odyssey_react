export default function NoDataReactTable({columns} : {columns: any}) {
    // Render the UI for your table
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead>
                <tr>
                    {columns.map((columnInfo: any) => (
                        <th
                            className={`px-3 py-3 text-left text-sm text-green-500 capitalize tracking-wider `}>
                            {columnInfo.Header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                <tr className="border-b">
                    <td colSpan={columns.length} className="px-3 text-sm text-gray-700 text-center py-2 whitespace-nowrap">
                        No data available in table
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
