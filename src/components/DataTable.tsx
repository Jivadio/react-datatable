import { useCallback, useEffect, useState } from "react";
import DatatableHeader from "./DataTableHeader";
import DatatableRow from "./DataTableRow";
import sortItems from "../utils/sortItems";
import filterItems from "../utils/filterItems";
import "../styles/build.css";

import {
  PaginatedListProps,
  DataItemProps,
  FilterSortParams,
} from "./DataTable.types";

export default function DataTable({
                                    listTitle,
                                    dataItems,
                                    actionOptions = { actionTitle: undefined, actionHandler: undefined, buttonLabel: undefined },
                                    columnHeaders,
                                    paginationOptions = [5, 10, 15],
                                  }: PaginatedListProps) {
  const [allDataItems, setAllDataItems] = useState(dataItems); // All items
  const [filteredDataItems, setFilteredDataItems] = useState(allDataItems); // Items after filtering
  const [paginatedDataItems, setPaginatedDataItems] = useState<DataItemProps[]>([]); // Filtered items after pagination

  const [filterSortParams, setFilterSortParams] = useState<FilterSortParams>({
    searchQuery: "",
    sortOrder: [columnHeaders[0].sortText, "asc"],
  });

  paginationOptions.sort((a, b) => a - b);
  const index = paginationOptions.findIndex(
    option => option >= filteredDataItems.length
  );
  const adjustedPaginationOptions =
    index !== -1 ? paginationOptions.slice(0, index + 1) : paginationOptions;

  const [paginationParams, setPaginationParams] = useState({
    perPage: adjustedPaginationOptions[0],
    currentPage: 0,
  });

  let totalPages = Math.ceil(filteredDataItems.length / paginationParams.perPage);
  if (filteredDataItems.length === 0) totalPages = 1;

  const paginationMin = paginationParams.currentPage * paginationParams.perPage + 1;
  const paginationMax = Math.min(
    filteredDataItems.length,
    (paginationParams.currentPage + 1) * paginationParams.perPage
  );

  const paginate = useCallback(
    (perPage: number, page: number) => {
      const itemsAfterPagination = filteredDataItems.slice(
        page * perPage,
        (page + 1) * perPage
      );

      setPaginatedDataItems(itemsAfterPagination);
    },
    [filteredDataItems]
  );

  function handleFilter(value: string) {
    const filterFields = columnHeaders.map(header => header.sortText);
    const result = filterItems(allDataItems, value, filterFields);
    setFilterSortParams({ ...filterSortParams, searchQuery: value });
    setFilteredDataItems(result);
  }

  function handleSort(order: "asc" | "desc", field: string) {
    const sortedItems = sortItems([...filteredDataItems], field, order);

    setFilterSortParams({ ...filterSortParams, sortOrder: [field, order] });
    setFilteredDataItems(sortedItems);
  }

  useEffect(() => {
    const filterFields = columnHeaders.map(header => header.sortText);
    const itemsFiltered = filterItems(
      dataItems,
      filterSortParams.searchQuery,
      filterFields
    );
    const itemsSorted = sortItems(
      itemsFiltered,
      filterSortParams.sortOrder[0],
      filterSortParams.sortOrder[1]
    );

    setAllDataItems(dataItems);
    setFilteredDataItems(itemsSorted);
  }, [dataItems, filterSortParams, columnHeaders]);

  useEffect(() => {
    paginate(paginationParams.perPage, paginationParams.currentPage);
  }, [paginate, paginationParams, filteredDataItems]);

  useEffect(() => {
    if (paginationParams.currentPage >= totalPages) {
      setPaginationParams({
        ...paginationParams,
        currentPage: totalPages - 1,
      });
    }
  }, [totalPages, paginationParams]);

  return (
    <div className="flex flex-col gap-8 rounded-md border border-gray-300 bg-gradient-to-br from-gray-50 to-gray-200 p-4 shadow-md">
      <h2 className="text-center text-2xl font-bold">{listTitle}</h2>
      <section className="flex flex-col justify-between gap-4 p-1 sm:flex-row">
        <div>
          {adjustedPaginationOptions.length > 1 &&
            filteredDataItems.length > 0 && (
              <label
                className="flex items-center gap-2"
                htmlFor="paginate"
              >
                Show{" "}
                <select
                  name="paginate"
                  id="paginate"
                  onChange={e =>
                    setPaginationParams({
                      ...paginationParams,
                      perPage: Number(e.target.value),
                    })
                  }
                  className="rounded-md border border-gray-300 bg-white p-2"
                >
                  {adjustedPaginationOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>{" "}
                records
              </label>
            )}
        </div>
        <input
          type="text"
          placeholder="Search"
          onChange={e => handleFilter(e.target.value)}
          className="rounded-md border border-gray-300 bg-white p-2"
        />
      </section>

      <div
        className="overflow-x-auto"
        style={{
          scrollbarColor: "rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.2)",
          scrollbarWidth: "thin",
        }}
      >
        <table className="mx-auto border border-gray-400">
          <thead>
          <tr className="bg-gray-300">
            {columnHeaders.map(header => {
              return (
                <DatatableHeader
                  key={`th_${header.sortText}`}
                  headerTitle={header.title}
                  sortKey={header.sortText}
                  onSort={handleSort}
                  activeSortKey={`${filterSortParams.sortOrder[0]}_${filterSortParams.sortOrder[1]}`}
                />
              );
            })}

            {actionOptions.actionTitle && (
              <th className="relative border border-gray-400 px-4 py-4">
                {actionOptions.actionTitle}
              </th>
            )}
          </tr>
          </thead>
          <tbody>
          {paginatedDataItems.length === 0 ? (
            <tr className="even:bg-gray-100">
              <td
                colSpan={10}
                className="border border-gray-400 p-2 px-4 text-center"
              >
                No records to display!
              </td>
            </tr>
          ) : (
            paginatedDataItems.map(item => (
              <DatatableRow
                key={item.itemId}
                dataItem={item}
                columnHeaders={columnHeaders}
                actionOptions={actionOptions}
              />
            ))
          )}
          </tbody>
        </table>
      </div>

      <section className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
        <span>
          {filteredDataItems.length === 0
            ? "Showing 0 records"
            : `Showing ${paginationMin} to ${paginationMax} of ${filteredDataItems.length} records 
            ${filteredDataItems.length !== allDataItems.length ? "(filtered)" : ""}`}
        </span>
        <div className="flex items-center justify-center gap-4">
          <span>
            Page {paginationParams.currentPage + 1} of {totalPages}
          </span>
          {paginationParams.currentPage >= 1 && (
            <button
              onClick={() =>
                setPaginationParams({
                  ...paginationParams,
                  currentPage: paginationParams.currentPage - 1,
                })
              }
              className="rounded-md border border-gray-400 bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
            >
              Previous page
            </button>
          )}
          {paginationParams.currentPage < totalPages - 1 && (
            <button
              onClick={() =>
                setPaginationParams({
                  ...paginationParams,
                  currentPage: paginationParams.currentPage + 1,
                })
              }
              className="rounded-md border border-gray-400 bg-gray-300 px-4 py-2 transition-all hover:bg-gray-400 focus:bg-gray-400"
            >
              Next page
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
