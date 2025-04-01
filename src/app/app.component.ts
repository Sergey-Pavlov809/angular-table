import { Component } from '@angular/core';
import { TableComponent } from './table';

@Component({
  selector: 'app-root',
  imports: [TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
