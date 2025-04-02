import { Component, ComponentFactoryResolver, Input, PipeTransform, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFormattedRows, getRowValue } from './lib/utils';
import { TColumn, TRow, TSort } from './lib/types';
import { defaultSort } from './lib/constants';
import { CeilComponent } from './components/ceil/ceil.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';

@Component({
  selector: 'app-table',
  imports: [FormsModule, ReactiveFormsModule, CeilComponent, CustomPipePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: TColumn[] = []
  @Input() rows: TRow[] = []
  @Input() checked: boolean = false


  copyRows: TRow[] = []
  isShowFilters: boolean = true;
  sort: TSort = defaultSort
  formattedRows: TRow[] = []
  filters!: FormGroup;

  constructor(private vcr: ViewContainerRef) {}

  initForm = () => {
    const additionalFilters = {
      showOnlySelected: new FormControl(false)
    }

    const filters = this.columns.reduce((acc, el) => {
      return {
        ...acc,
        [el.key]: new FormControl()
      }
    }, additionalFilters)

    this.filters = new FormGroup(filters)
  }

  initCastomCeils = () => {

  }

  ngOnInit() {
    this.initForm()
    this.formattedRows = getFormattedRows(this.rows)
    this.copyRows = getFormattedRows(this.rows)
    this.initCastomCeils()
  }
/*
  ngOnChanges(changes: SimpleChanges) {
    if (changes['columns'] || changes['rows']) {
      this.renderComponents();
    }
  }


  private async renderComponents() {
    // Очищаем предыдущие компоненты
    this.vcr.clear();
    
    // Даем Angular время обработать изменения
    await Promise.resolve();

    this.componentHosts.forEach((container, index) => {
      console.log(this.componentHosts)
      const colIndex = 3;

      const rowIndex = Math.floor(index / this.columns.length);
      const column = this.columns[colIndex];
      const row = this.rows[rowIndex];

      console.log(column, row)

      if (column.formatterComponent && row) {
        // Создаем компонент напрямую
        // const componentRef = container.createComponent(column.formatterComponent);
        
        // Устанавливаем входные параметры
        // componentRef.setInput('value', this.getCellValue(column, row));
        
        // Передаем дополнительные параметры
        if (column.formatterInputs) {
          Object.entries(column.formatterInputs).forEach(([key, value]) => {
            componentRef.setInput(key, value);
          });
        }
      }
    });
  }*/

  getCellValue(column: TColumn, row: TRow): any {
    return row.find((r) => r.key === column.key);
  }

  onResetFilters = () => {
    this.filters.reset();
    this.filters.value.showOnlySelected = false

    this.formattedRows = this.copyRows
  } 

  onShowOnlySelectedClick = () => {
    this.filters.value.showOnlySelected = !this.filters.value.showOnlySelected

    if(this.filters.value.showOnlySelected) {
      const selectedFilterWorker = new Worker(new URL('./lib/selectedFilter.worker', import.meta.url), { type: 'module' })
      selectedFilterWorker.postMessage({ rows: this.formattedRows, filters: this.filters.value })
      selectedFilterWorker.onmessage = ({ data }) => {
        this.formattedRows = data
      };
    } else {
      const newRows = this.copyRows.map((row) => {
        const f = this.formattedRows.find((fr) => {
          const rowFromCopy = row.find((fn) => fn.key === 'id')
          const currRow = fr.find((r1) => r1.key === 'id')
          return  rowFromCopy?.value === currRow?.value
        })

        if(f) return f
        return row
      })
      this.formattedRows = newRows
    }
  }

  onChangeInput = () => {
    const sortWorker = new Worker(new URL('./lib/filter.worker', import.meta.url), { type: 'module' })

    sortWorker.postMessage({ rows: this.formattedRows, filters: this.filters.value })

    sortWorker.onmessage = ({ data }) => {
      this.formattedRows = data
    };
  }

  onSetSort = (e: Event) => {
    const target = e.target as HTMLElement;
    const thElement = target.closest('th');
    
    if (!thElement) return;
  
    const columnKey = thElement.dataset['columnKey'];
    
    if (columnKey) {
      if(columnKey === this.sort.key){
        this.sort = {
          ...this.sort,
          direction: !this.sort.direction
        }
      } else {
        this.sort = {
          key: columnKey,
          direction: true
        }
      }

      const sortWorker = new Worker(new URL('./lib/sort.worker', import.meta.url), { type: 'module' })

      sortWorker.postMessage({ rows: this.formattedRows, sortOptions: this.sort })

      sortWorker.onmessage = ({ data }) => {
        this.formattedRows = data
      };
    }
  }

  onCheckboxChange = (row: TRow) => {
    const newRows = this.formattedRows.map((r) => {
      if(r !== row) return r
    
      const res = r.map((el) => {
        if(el.key !== "checkbox") return el

        return {
          key: 'checkbox',
          value: !el.value
        }
      })

      return res
      
    })
    console.log(newRows)
    this.formattedRows = newRows
  }

  getCheckedState = (row: TRow) => {
    return row.find((r) => r.key === 'checkbox')?.value
  }

  onHideFilters = () => {
    this.isShowFilters = !this.isShowFilters
  }
}
