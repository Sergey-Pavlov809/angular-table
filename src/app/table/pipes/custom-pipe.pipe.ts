import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {
  transform<T>(value: T, ...args: unknown[]): T {
    return value;
  }
}
