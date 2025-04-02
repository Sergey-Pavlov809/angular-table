import { TRow } from "./types";


addEventListener('message', (props) => {
    const rows = props.data.rows;
    const filters = Object.entries(props.data.filters).filter(([key,val]) => val !== null && key !== 'showOnlySelected');

    const res = rows.filter((row: TRow) => {
        return filters.every(([k,v]) => {
            return String(row.find((r) => r.key === String(k))?.value) === v
        })
    })

    postMessage(res);
})