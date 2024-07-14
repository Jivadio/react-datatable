import { DataItemProps } from "../components/DataTable.types";

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
