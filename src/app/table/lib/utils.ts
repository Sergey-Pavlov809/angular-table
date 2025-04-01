import { TColumn, TRow } from "./types"

export const getFormattedRows = (rows: TRow[]) => {
  return rows.reduce<TRow[]>((rows, row) => {
    return [...rows, [{ key: 'checkbox', value: false }, ...row]]
  },[])
}

export const filterRows = (rows: TRow[], filters: Record<string, string>) => {
    return rows.filter((row) => true) 
}

export const getRowValue = (colSel: TColumn, row: TRow) => {
    return row.find((e) => e.key === colSel.key)
}