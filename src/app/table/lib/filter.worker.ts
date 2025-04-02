import { TRow } from "./types";


addEventListener('message', (props) => {
    const rows = props.data.rows;
    const filters = Object.entries(props.data.filters).filter(([key,val]) => val && key !== 'showOnlySelected');
    const copyRows = props.data.copyRows;

    if(filters.length === 0) {
        postMessage(copyRows);
        return
    }


    console.log(filters)
    const res = rows.filter((row: TRow) => {
        return filters.every(([k,v]) => {
            return String(row.find((r) => r.key === String(k))?.value) === v
        })
    })

    postMessage(res);
})