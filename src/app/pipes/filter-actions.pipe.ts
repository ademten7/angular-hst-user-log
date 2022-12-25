import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActions'
})
export class FilterActionsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
