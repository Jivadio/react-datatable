import { DataItemProps } from "../components/DataTable.types";

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
