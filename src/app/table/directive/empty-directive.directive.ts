import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appEmptyDirective]'
})
export class EmptyDirectiveDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input, this.el)
  }
}
