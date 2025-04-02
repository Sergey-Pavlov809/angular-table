import { Component, ComponentFactoryResolver, Input, PipeTransform, QueryList, SimpleChanges, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFormattedRows, getRowValue } from './lib/utils';
import { TColumn, TRow, TSort } from './lib/types';
import { defaultSort } from './lib/constants';
import { CeilComponent } from './components/ceil/ceil.component';
import { CustomPipePipe } from './pipes/custom-pipe.pipe';
import { EmptyDirectiveDirective } from './directive/empty-directive.directive';

@Component({
  selector: 'app-table',
  imports: [FormsModule, ReactiveFormsModule, CeilComponent, CustomPipePipe, EmptyDirectiveDirective],
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

    sortWorker.postMessage({ rows: this.formattedRows, filters: this.filters.value, copyRows: this.copyRows })

    sortWorker.onmessage = ({ data }) => {
      console.log(data)
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

    this.formattedRows = newRows
  }

  getCheckedState = (row: TRow) => {
    return row.find((r) => r.key === 'checkbox')?.value
  }

  onHideFilters = () => {
    this.isShowFilters = !this.isShowFilters
  }
}
