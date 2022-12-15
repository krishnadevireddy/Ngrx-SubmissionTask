import { Component, OnInit } from '@angular/core';
import { Submissions } from './submissions.model';
import  * as submissions from '../../assets/submissions.json';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

interface Status {
  value: string;
  name: string;
}
@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})

 



export class SubmissionsComponent  implements OnInit{

  // google maps zoom level
  zoom: number = 8;
 
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
 
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
 
  // markers = [
  //     {
  //         lat: 51.673858,
  //         lng: 7.815982,
  //         label: "A",
  //         draggable: true
  //     },
  //     {
  //         lat: 51.373858,
  //         lng: 7.215982,
  //         label: "B",
  //         draggable: false
  //     },
  //     {
  //         lat: 51.723858,
  //         lng: 7.895982,
  //         label: "C",
  //         draggable: true
  //     }
  // ]

  
  submissionsList:Submissions[]=[];
  cloneList:Submissions[]=[];
  searchText='';
  selectedStatus='';
  dueDateValue='';
  selectedButton='';
  fileName= 'Submissions.xlsx';

  page = 1;
  pageSize = 5;
  // data: any = submissions;

  statusList: Status[] = [
    {value: '0', name: 'Low Risk'},
    {value: '1', name: 'UnComplete'},
    {value: '2', name: 'UnAssigned'},
  ];

  
  handlePageChange(e :any){
    // this.page = e;
    console.log(e);
    this.page = e;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  constructor(private httpClient:HttpClient,
    private datepipe:DatePipe){

  }

  
ngOnInit(): void {
  this.httpClient.get('../../assets/submissions.json').subscribe((response:any)=>{

this.submissionsList=this.cloneList=response;
console.log(this.submissionsList)
  });
  this.selectedButton='List';
 
}
onStatusSelection(e:any){
  this.submissionsList=[];
  this.submissionsList=this.cloneList;
  console.log(e)
  this.selectedStatus=e;
  console.log(this.selectedStatus)
let filterdata=this.submissionsList.filter(item=>item.status.toLowerCase()==this.selectedStatus.toLowerCase());

  this.submissionsList=filterdata;

}
orgValueChange(){
  console.log(this.datepipe.transform(this.dueDateValue, 'dd/MM/yyyy'))
  this.submissionsList=[];
  this.submissionsList=this.cloneList;

  console.log(this.selectedStatus)
  this.submissionsList.forEach(element => {
    console.log(this.datepipe.transform(element.duedate, 'dd/MM/yyyy'))
  });
let filterdata=this.submissionsList.filter(item=> this.datepipe.transform(item.duedate, 'dd/MM/yyyy')
==this.datepipe.transform(this.dueDateValue, 'dd/MM/yyyy')

);
console.log(filterdata)

  this.submissionsList=filterdata;
}
onValChange(value:any){
  console.log(value)
  this.selectedButton=value;
}

exportexcel(): void
{
  /* pass here the table id */
  let element = document.getElementById('excel-table');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */  
  XLSX.writeFile(wb, this.fileName);

}
}
