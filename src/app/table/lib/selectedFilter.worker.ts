import { filterRows } from './utils';
import { TPropsWorker, TRow } from "./types";


addEventListener('message', (props) => {
    const rows = props.data.rows;
    let res = rows.filter((row: TRow) =>  row.find((e) => e.key === 'checkbox')?.value === true)

    postMessage(res);
})