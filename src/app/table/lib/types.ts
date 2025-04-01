export type TColumn = {
    key: string;
    title: string;
    size?: number;
    type?: string;
}

export type TRow = {
    key: string;
    value: unknown;
}[]

export type TSort = {
    key: string;
    direction: boolean
}

export type TPropsWorker = { 
    message: {
        data: TRow[],
        field: string
    }
} 