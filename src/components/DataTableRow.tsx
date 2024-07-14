import { DataRowProps } from "./DataTable.types"

export default function DataTableRow({ dataItem, columnHeaders, actionOptions }: DataRowProps) {
  return (
    <tr
      key={dataItem.itemId}
      className="transition-all odd:bg-gray-200 even:bg-gray-100 hover:bg-cyan-100"
    >
      {columnHeaders.map(header => {
        return (
          <td
            key={`td_${header.sortText}`}
            className="whitespace-nowrap border border-gray-400 p-2 px-4"
          >
            {dataItem[header.sortText]}
          </td>
        );
      })}
      {actionOptions.actionHandler && (
        <td className="border border-gray-400 p-2 px-4">
          <button
            onClick={() => actionOptions.actionHandler?.(dataItem.itemId.toString())}
            className="rounded-md bg-red-600 p-2 font-semibold text-white transition-all hover:bg-red-800 focus:bg-red-800"
          >
            {actionOptions.buttonLabel}
          </button>
        </td>
      )}
    </tr>
  );
}
