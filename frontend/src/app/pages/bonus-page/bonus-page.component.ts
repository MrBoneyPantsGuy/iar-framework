import { PerformanceRecordService } from './../../services/performance-record.service';
import { Observable } from 'rxjs';
import { logging } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { SalesmanService } from './../../services/salesman.service';
import { EmployeeInfo } from './../../components/bonus/models/employeeInfo';
import { Bonus } from './../../models/bonus';
import { Component, Input, OnInit, Output } from '@angular/core';
import { OrdersEvaluation } from 'src/app/components/bonus/models/ordersEvaluation';
import { SocialPerformanceEvaluation } from 'src/app/components/bonus/models/socialPerformanceEvaluation';
import {Salesman} from '../../../../../backend/src/models/Salesman.js';
import { Console } from 'console';
import {OrderRecord} from '../../../../../backend/src/models/OrderRecord.js';
import {PerformanceRecord} from '../../../../../backend/src/models/PerformanceRecord.js';
import {SocialRecord} from  "../../../../../backend/src/models/SocialRecord.js";
const sale = require('../../../../../backend/src/models/Salesman.js');

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
  salesmanservice: SalesmanService;
  salesman:Salesman;
  allsalesman:Salesman[];
  filteredSalesman:Salesman[];
  orders:OrderRecord[];
  bonusYears:number[];
  recordService:PerformanceRecordService;
  record:PerformanceRecord;
  records:PerformanceRecord[];
  year:string;
  totalBonusA:number;
  totalBonusB:number;
  remark:string;
  // TODO fetch Infos from backnd
  constructor(http: HttpClient) {
    this.salesmanservice = new SalesmanService(http);
    this.recordService = new PerformanceRecordService(http);
    this.bonusYears = [];
    this.orders = [];
    this.allsalesman = [];
    this.filteredSalesman = [];
    this.records = [];
    this.year = "";
    
  }

  async ngOnInit() {
   
    
    this.salesman =   sale.constructor("salesmanId", "firstname", "lastname", "employeeId", "department", "governmentId");
    this.salesman = await this.salesmanservice.getSalesmanByEmployeeId("9").toPromise().then(e=>{console.log("obj:",e.body.firstname);return e.body;});
    this.allsalesman = await this.salesmanservice.getSalesmans().toPromise().then(x=>{return x.body;});
    this.records = await this.recordService.getPerformanceRecord(this.salesman.employeeId).toPromise().then(x=>{return x.body;});
    console.log(this.records);

  }
   changedRecord(item:[SocialRecord[]|OrderRecord[],any]){
    if(item[0].hasOwnProperty("competence")){
      this.record.socialRecords = item
    }else if(item[0].hasOwnProperty("productname")){
      this.record.orderRecords = item
    }else{
      console.error(item + "is invalid");
      throw new Error();
    }
    //update logik
    this.recordService.updatePerformanceRecord(this.record)
  }

    search(searchtext:string){
    this.filteredSalesman = this.allsalesman.filter(x=>x.firstname.includes(searchtext));
    if(this.filteredSalesman.length == 1){
      this.salesman = this.filteredSalesman[0];
       this.updateUI();
     
      
    }
  }

  latestYear(records:PerformanceRecord[],x:number=2000){

    records.forEach(y=>{
      console.log(y);
      var yearNumber:number = +y.year;
      this.bonusYears.push(yearNumber);
      
      if(yearNumber>x)
        x=yearNumber
    });
    this.bonusYears = [...new Set(this.bonusYears)].sort((a,b)=>b-a);

     return x;
  }
  async changedYear(selected){
     this.year = selected;
     this.updateUI(true);
  }
  async updateUI(yearIsSet=false){
      this.record = [];
      this.records = await this.recordService.getPerformanceRecord(this.salesman.employeeId).toPromise().then(x=>{return x.body;});
      if(!yearIsSet)
        this.year = ""+this.latestYear(this.records,);
      if(this.records.length > 0)
        this.record = this.records.find(x=>x.year == this.year);
    }

}
