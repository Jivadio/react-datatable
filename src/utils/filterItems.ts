import { DataItemProps } from "../components/DataTable.types";

/**
 * Filters data items based on a search query.
 * @param {Array<DataItemProps>} dataList - The list of data items to be filtered.
 * @param {string} searchQuery - The search query used for filtering.
 * @param {Array<string>} fields - The fields to be searched within each data item.
 * @returns {Array<DataItemProps>} The filtered list of data items.
 */
export default function filterDataItems(
  dataList: Array<DataItemProps>,
  searchQuery: string,
  fields: Array<string>
) {
    const filteredDataList = dataList.filter(dataItem => {
        let match = false;

        for (const field of fields) {
            if (
              String(dataItem[field]).toLowerCase().includes(searchQuery.toLowerCase())
            ) {
                match = true;
                break;
            }
        }

        return match;
    });

    return filteredDataList;
}
