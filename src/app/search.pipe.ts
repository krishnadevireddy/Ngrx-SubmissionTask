import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter(function (val: { task: string; status:string;from: string;to:string;customerAddress:string;duedate:string }): any {
      let rVal = (val.task.toLocaleLowerCase().includes(args)) || (val.status.toLocaleLowerCase().includes(args)) ||
      (val.from.toLocaleLowerCase().includes(args)) || (val.to.toLocaleLowerCase().includes(args)) || (
        val.customerAddress.toLocaleLowerCase().includes(args)) ||(val.duedate.toLocaleLowerCase().includes(args)) ;
      return rVal;
    })

  }

}