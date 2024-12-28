/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
const DisplayTable = ({ data, columns }) => {
  //   const [data, _setData] = React.useState(() => [...data]);
  //   const rerender = React.useReducer(() => ({}), {})[1];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2">
      <table className="w-full py-0 px-0 border-collapse">
        <thead className="bg-black text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>Sr.</th>

              {headerGroup.headers.map((header) => (
                <th className="border whitespace-nowrap" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row, i) => (
            <tr className="" key={row.id}>
              <td className="border px-2 py-1">{i + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td
                  className="border px-2 py-1 whitespace-nowrap"
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>
  );
};

export default DisplayTable;
