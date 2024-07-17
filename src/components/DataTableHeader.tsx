import { TableColumnProps } from "./DataTable.types";

/**
 * DataTableHeader Component
 * @param {Object} props - Properties passed to the component
 * @param {string} props.headerTitle - The display name of the column.
 * @param {string} props.sortKey - The key to be used for sorting.
 * @param {(order: "asc" | "desc", key: string) => void} props.onSort - The function to handle sorting.
 * @param {string} props.activeSortKey - The currently active sort key.
 */
export default function DataTableHeader({
                                          headerTitle,
                                          sortKey,
                                          onSort,
                                          activeSortKey,
                                        }: TableColumnProps) {
  return (
    <th className="relative whitespace-nowrap border border-gray-400 px-4 py-4 pr-8 transition-all">
      <p>{headerTitle}</p>
      <button
        onClick={() => onSort("asc", sortKey)}
        className={`${activeSortKey === `${sortKey}_asc` ? "opacity-100" : "opacity-40"} absolute bottom-2/4 right-1 -rotate-90 cursor-pointer transition-all`}
      >
        {">"}
      </button>
      <button
        onClick={() => onSort("desc", sortKey)}
        className={`${activeSortKey === `${sortKey}_desc` ? "opacity-100" : "opacity-40"} absolute right-1 top-2/4 -rotate-90 cursor-pointer transition-all`}
      >
        {"<"}
      </button>
    </th>
  );
}
