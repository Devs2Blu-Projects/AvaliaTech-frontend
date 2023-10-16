import {Pipe, PipeTransform} from '@angular/core';

/*
  Reference: https://stackoverflow.com/questions/40678206/angular-2-filter-search-list
*/
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  public transform(value: any, columns: string[], term: string) {
    if (!term || !value) return value;

    let regex = new RegExp(term, 'gi')

    return value.filter((item: any) => columns.some(key => item.hasOwnProperty(key) && regex.test(item[key])));
  }
}