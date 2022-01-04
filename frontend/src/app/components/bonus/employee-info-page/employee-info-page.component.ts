import { EmployeeInfo } from './../models/employeeInfo';
import { Component, OnInit,Input } from '@angular/core';
import {Salesman} from "../../../../../../backend/src/models/Salesman.js";
@Component({
  selector: 'app-employee-info-page',
  templateUrl: './employee-info-page.component.html',
  styleUrls: ['./employee-info-page.component.css']
})
export class EmployeeInfoPageComponent implements OnInit {
  @Input() emplInfo:Salesman;
  @Input() year:string;
  constructor() {
    
   }

  ngOnInit(): void {
   
  }

}
