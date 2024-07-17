/**
 * PaginatedListProps Interface
 * @interface PaginatedListProps
 * @property {string} listTitle - The title of the data table.
 * @property {Array<DataItemProps>} dataItems - An array of data items to be displayed.
 * @property {Array<{title: string; sortText: string; headerTitle: string; sortKey: string;}>} columnHeaders - An array of column headers for the table.
 * @property {Object} [actionOptions] - Options for actions on each row.
 * @property {string | undefined} [actionOptions.actionTitle] - The title for the action column.
 * @property {((id: string) => void) | undefined} [actionOptions.actionHandler] - The handler function for the action.
 * @property {string | undefined} [actionOptions.buttonLabel] - The label for the action button.
 * @property {Array<number>} [paginationOptions] - An array of pagination options.
 */
export interface PaginatedListProps {
    listTitle: string;
    dataItems: Array<DataItemProps>;
    columnHeaders: Array<{
        title: string;
        sortText: string;
        headerTitle: string;
        sortKey: string;
    }>;
    actionOptions?: {
        actionTitle: string | undefined;
        actionHandler: ((id: string) => void) | undefined;
        buttonLabel: string | undefined;
    };
    paginationOptions?: Array<number>;
}

/**
 * FilterSortParams Interface
 * @interface FilterSortParams
 * @property {string} searchQuery - The search query for filtering data.
 * @property {[string, "asc" | "desc"]} sortOrder - The sort order and field.
 */
export interface FilterSortParams {
    searchQuery: string;
    sortOrder: [string, "asc" | "desc"];
}

/**
 * DataItemProps Interface
 * @interface DataItemProps
 * @property {string} itemId - The unique identifier for the data item.
 * @property {string | number} [key: string] - Other properties of the data item.
 */
export interface DataItemProps {
    itemId: string;
    [key: string]: string | number;
}

/**
 * DataRowProps Interface
 * @interface DataRowProps
 * @property {DataItemProps} dataItem - The data item to be displayed in the row.
 * @property {Array<{headerTitle: string; sortKey: string; sortText: string;}>} columnHeaders - The column headers for the table.
 * @property {Object} actionOptions - The options for actions on each row.
 * @property {string | undefined} [actionOptions.actionTitle] - The title for the action column.
 * @property {((id: string) => void) | undefined} [actionOptions.actionHandler] - The handler function for the action.
 * @property {string | undefined} [actionOptions.buttonLabel] - The label for the action button.
 */
export interface DataRowProps {
    dataItem: DataItemProps;
    columnHeaders: Array<{
        headerTitle: string;
        sortKey: string;
        sortText: string;
    }>;
    actionOptions: {
        actionTitle: string | undefined;
        actionHandler: ((id: string) => void) | undefined;
        buttonLabel: string | undefined;
    };
}

/**
 * TableColumnProps Interface
 * @interface TableColumnProps
 * @property {string} headerTitle - The display name of the column.
 * @property {string} sortKey - The key to be used for sorting.
 * @property {(order: "asc" | "desc", key: string) => void} onSort - The function to handle sorting.
 * @property {string} activeSortKey - The currently active sort key.
 */
export interface TableColumnProps {
    headerTitle: string;
    sortKey: string;
    onSort: (order: "asc" | "desc", key: string) => void;
    activeSortKey: string;
}
