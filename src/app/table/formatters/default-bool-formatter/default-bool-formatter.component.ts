import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-default-bool-formatter',
  imports: [],
  templateUrl: './default-bool-formatter.component.html',
  styleUrl: './default-bool-formatter.component.scss'
})
export class DefaultBoolFormatterComponent {
  @Input() value: unknown;
}
