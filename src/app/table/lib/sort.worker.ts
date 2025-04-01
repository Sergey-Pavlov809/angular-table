import { TRow } from "./types";

addEventListener('message', (props) => {
    const rows = props.data.rows;
    const sortOptions = props.data.sortOptions;

    let res = [];


    if(sortOptions.direction){
        res = rows.sort((a: TRow, b: TRow) => {
            const f1 = a.find((e) => e.key === sortOptions.key)?.value
            const f2 = a.find((e) => e.key === sortOptions.key)?.value
            if(!Number.isNaN(Number(f1)) && !Number.isNaN(Number(f2))) return Number(f1) - Number(f2)
            return (String(f1) > String(f2)) ? 1 : -1
        });
    } else {
        res = rows.sort((a: TRow, b: TRow) => {
            const f1 = a.find((e) => e.key === sortOptions.key)?.value
            const f2 = a.find((e) => e.key === sortOptions.key)?.value
            if(!Number.isNaN(Number(f1)) && !Number.isNaN(Number(f2))) return Number(f2) - Number(f1)
            return (String(f1) > String(f2)) ? -1 : 1
        });
    }

    postMessage(res);
  });



  /**
   * addEventListener('message', (event: MessageEvent<{ 
  rows: TRow[]; 
  sortOptions: { key: string; direction: boolean } 
}>) => {
  const { rows, sortOptions } = event.data;
  
  const compareValues = (a: unknown, b: unknown): number => {
    // Обработка null/undefined
    if (a == null) return b == null ? 0 : -1;
    if (b == null) return 1;

    // Числовое сравнение
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    // Булево сравнение
    if (typeof a === 'boolean' && typeof b === 'boolean') {
      return Number(a) - Number(b);
    }

    // Строковое сравнение
    return String(a).localeCompare(String(b));
  };

  const sorted = [...rows].sort((aRow, bRow) => {
    const a = aRow.find(e => e.key === sortOptions.key)?.value;
    const b = bRow.find(e => e.key === sortOptions.key)?.value;
    
    const comparison = compareValues(a, b);
    return sortOptions.direction ? comparison : -comparison;
  });

  postMessage(sorted);
});
   */