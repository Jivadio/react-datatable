import { DataItemProps } from "../components/DataTable.types";

/**
 * Sorts data items based on a specified field and order.
 * @param {Array<DataItemProps>} dataList - The list of data items to be sorted.
 * @param {string} sortField - The field to sort by.
 * @param {"asc" | "desc"} sortOrder - The order to sort by ("asc" for ascending, "desc" for descending).
 * @returns {Array<DataItemProps>} The sorted list of data items.
 */
export default function sortDataItems(
  dataList: Array<DataItemProps>,
  sortField: string,
  sortOrder: "asc" | "desc"
) {
    if (sortOrder === "asc") {
        dataList.sort((a, b) => {
            if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
                if (a[sortField] < b[sortField]) return -1;
                if (a[sortField] > b[sortField]) return 1;
                return 0;
            } else if (
              typeof a[sortField] === "string" &&
              typeof b[sortField] === "string"
            ) {
                if (
                  (a[sortField] as string).toLowerCase() <
                  (b[sortField] as string).toLowerCase()
                )
                    return -1;
                if (
                  (a[sortField] as string).toLowerCase() >
                  (b[sortField] as string).toLowerCase()
                )
                    return 1;
                return 0;
            }
            return 0;
        });
    } else if (sortOrder === "desc") {
        dataList.sort((a, b) => {
            if (typeof a[sortField] === "number" && typeof b[sortField] === "number") {
                if (a[sortField] < b[sortField]) return 1;
                if (a[sortField] > b[sortField]) return -1;
                return 0;
            } else if (
              typeof a[sortField] === "string" &&
              typeof b[sortField] === "string"
            ) {
                if (
                  (a[sortField] as string).toLowerCase() <
                  (b[sortField] as string).toLowerCase()
                )
                    return 1;
                if (
                  (a[sortField] as string).toLowerCase() >
                  (b[sortField] as string).toLowerCase()
                )
                    return -1;
                return 0;
            }
            return 0;
        });
    }

    return dataList;
}
