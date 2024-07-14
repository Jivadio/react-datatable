export interface PaginatedListProps {
    listTitle: string;
    dataItems: Array<DataItemProps>;
    columnHeaders: Array<{
        title: string;
        sortText: string;
        headerTitle: string; sortKey: string }>;
    actionOptions?: {
        actionTitle: string | undefined;
        actionHandler: ((id: string) => void) | undefined;
        buttonLabel: string | undefined;
    };
    paginationOptions?: Array<number>;
}

export interface FilterSortParams {
    searchQuery: string;
    sortOrder: [string, "asc" | "desc"];
}

export interface DataItemProps {
    itemId: string;
    [key: string]: string | number;
}

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

export interface TableColumnProps {
    headerTitle: string;
    sortKey: string;
    onSort: (order: "asc" | "desc", key: string) => void;
    activeSortKey: string;
}
