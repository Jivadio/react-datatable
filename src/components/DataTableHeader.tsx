import { TableColumnProps } from "./DataTable.types";

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