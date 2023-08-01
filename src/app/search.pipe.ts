import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(tasks:any,searchText:any) {

    if (searchText==null) return tasks;
    return tasks.filter(function(){
      return 
    })
  }
}
