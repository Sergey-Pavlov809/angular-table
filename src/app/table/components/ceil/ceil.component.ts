import { Component, ComponentRef, Injector, Input, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { TColumn, TRow } from '../../lib/types';
import { getRowValue } from '../../lib/utils';

@Component({
  selector: 'app-ceil',
  imports: [],
  templateUrl: './ceil.component.html',
  styleUrl: './ceil.component.scss'
})
export class CeilComponent {
  @Input() column: TColumn | undefined
  @Input() row: TRow | undefined

  constructor(private vcr: ViewContainerRef){

  }

  initCeil(){
    if(this.column?.formatterComponent) {
      this.vcr?.clear();
      const componentRef = this.vcr?.createComponent(this.column?.formatterComponent);
      componentRef.instance.value = this.row?.find((r) => r.key === this.column?.key)?.value;
    }
  }

  ngOnInit() {
    this.initCeil()
    console.log(this.row, this.column, this.vcr)
  }

  getRowValueGetter = getRowValue
}
