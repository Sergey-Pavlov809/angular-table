import { filterRows } from './utils';
import { TPropsWorker, TRow } from "./types";


addEventListener('message', (props) => {
    const rows = props.data.rows;
    const filters = Object.entries(props.data.filters).filter(([key]) => key === 'showOnlySelected');

    let res = rows.filter((row: TRow) => {
        console.log(row, filters)
        return row.find((e) => e.key === 'checkbox')?.value === true
    })

    postMessage(res);
})