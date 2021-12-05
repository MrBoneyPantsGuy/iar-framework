import { EmployeeInfo } from './../../components/bonus/models/employeeInfo';
import { Bonus } from './../../models/bonus';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
  bonus: Bonus
  info: EmployeeInfo
  ye:string
  constructor() { this.ye = "2023";
  this.bonus = new Bonus();
  this.info = new EmployeeInfo();
  this.info.name = "bp";
  }

  ngOnInit(): void {
    
  }
 
}
