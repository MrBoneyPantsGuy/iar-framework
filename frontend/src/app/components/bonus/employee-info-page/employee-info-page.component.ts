import { EmployeeInfo } from './../models/employeeInfo';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-employee-info-page',
  templateUrl: './employee-info-page.component.html',
  styleUrls: ['./employee-info-page.component.css']
})
export class EmployeeInfoPageComponent implements OnInit {
  @Input() emplInfo:EmployeeInfo;
  @Input() year:string;
  constructor() {
    
   }

  ngOnInit(): void {
    /*this.emplInfo = new EmployeeInfo();
    this.emplInfo.name = "Name";
    this.emplInfo.department = "Dep"*/
  }

}
