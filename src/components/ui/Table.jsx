export default function Table({ columns, data, onRowClick, emptyMessage = 'No data found' }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-primary-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-5 py-3.5 text-left font-medium text-primary-500 uppercase tracking-widest text-[11px]"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center text-primary-400 italic">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row.id || i}
                onClick={() => onRowClick?.(row)}
                className={`
                  hover:bg-primary-50 transition-colors
                  ${onRowClick ? 'cursor-pointer' : ''}
                `}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-5 py-3.5 text-primary-700">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
