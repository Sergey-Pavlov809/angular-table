import { Type } from "@angular/core";

export type CeilProps = {
    value: unknown
}

export type TColumn = {
    key: string;
    title: string;
    size?: number;
    type?: string;
    formatter?: unknown;
    formatterComponent?: Type<CeilProps>;
    formatterInputs?: Record<string, unknown>;
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