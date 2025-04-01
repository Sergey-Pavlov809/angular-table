import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultBool'
})
export class DefaultBoolPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
