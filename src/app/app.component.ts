import { Component } from '@angular/core';
import { TableComponent, TColumn, TRow } from './table';

const ROWS: TRow[] = [
  [
    { key: "id", value: 1 },
    { key: "name", value: "Alice" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asdqweq' },
    { key: "stock", value: null }
  ],
  [
    { key: "id", value: 2 },
    { key: "name", value: "123" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asdqweq' },
    { key: "stock", value: 'stock' }
  ],
  [
    { key: "id", value: 145 },
    { key: "name", value: "Laptop" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asd' },
    { key: "stock", value: 'stock val' }
  ],
  [
    { key: "id", value: 145 },
    { key: "name", value: "Lapptop" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asd' },
    { key: "stock", value: 'stock val' }
  ],

  [
    { key: "id", value: 146 },
    { key: "name", value: "Laptop" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asd' },
    { key: "stock", value: null }
  ],    
  [
    { key: "id", value: 175 },
    { key: "name", value: "Laptop" },
    { key: "date", value: new Date() },
    { key: "is_active", value: true },
    { key: "metadata", value: 'asd' },
    { key: "stock", value: null }
  ],
];

const COLUMNS: TColumn[]  = [
  {
    key: 'id',
    title: 'id',
    type: 'number'
  },
  {
    key: 'name',
    title: 'name',
    type: 'string'
  },
  {
    key: 'date',
    title: 'date',
    type: 'date'
  },
  {
    key: 'is_active',
    title: 'is_active',
    type: 'boolean',
  },
  {
    key: 'metadata',
    title: 'metadata',
  },
  {
    key: 'stock',
    title: 'stock',
  },
] 

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  columns = COLUMNS;
  rows = ROWS;
}
