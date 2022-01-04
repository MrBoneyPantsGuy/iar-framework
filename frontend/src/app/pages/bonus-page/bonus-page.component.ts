import { PerformanceRecordService } from './../../services/performance-record.service';
import { OrderService } from './../../services/order.service';
import { Observable } from 'rxjs';
import { logging } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { SalesmanService } from './../../services/salesman.service';
import { EmployeeInfo } from './../../components/bonus/models/employeeInfo';
import { Bonus } from './../../models/bonus';
import { Component, Input, OnInit, Output } from '@angular/core';
import { OrdersEvaluation } from 'src/app/components/bonus/models/ordersEvaluation';
import { SocialPerformanceEvaluation } from 'src/app/components/bonus/models/socialPerformanceEvaluation';
import { Order } from 'src/app/components/bonus/models/order';
import {Salesman} from '../../../../../backend/src/models/Salesman.js';
import { Console } from 'console';
import {OrderRecord} from '../../../../../backend/src/models/OrderRecord.js';
import {PerformanceRecord} from '../../../../../backend/src/models/PerformanceRecord.js';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

const sale = require('../../../../../backend/src/models/Salesman.js');

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
 // bonus: Bonus;
  salesmanservice: SalesmanService;
  orderservice: OrderService;
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
    this.orderservice = new OrderService(http);
    this.recordService = new PerformanceRecordService(http);
    this.bonusYears = [];
    this.orders = [];
    this.allsalesman = [];
    this.filteredSalesman = [];
    this.records = [];
    this.year = "";
    
  }

  async ngOnInit() {
    debugger;
    
    this.salesman =   sale.constructor("salesmanId", "firstname", "lastname", "employeeId", "department", "governmentId");
    this.salesman = await this.salesmanservice.getSalesmanByEmployeeId("9").toPromise().then(e=>{console.log("obj:",e.body.firstname);return e.body;});
    this.allsalesman = await this.salesmanservice.getSalesmans().toPromise().then(x=>{return x.body;});
   // this.orders.push(await this.orderservice.getOrdersRecord().toPromise().then(x=>{return x.body;}));
    this.records = await this.recordService.getPerformanceRecord(this.salesman.employeeId).toPromise().then(x=>{return x.body;});
    debugger;
    console.log(this.records);

  }

    search(searchtext:string){
    this.filteredSalesman = this.allsalesman.filter(x=>x.firstname.includes(searchtext));
    if(this.filteredSalesman.length == 1){
      this.salesman = this.filteredSalesman[0];
      debugger;
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
    //debugger;

     return x;
  }
  async changedYear(selected){
    alert(selected);
    
    this.year = selected;
     this.updateUI(true);
  }
  async updateUI(yearIsSet=false){
      this.record = [];
      this.records = await this.recordService.getPerformanceRecord(this.salesman.employeeId).toPromise().then(x=>{return x.body;});
      if(!yearIsSet)
        this.year = ""+this.latestYear(this.records,);
      debugger;
      if(this.records.length > 0)
        this.record = this.records.find(x=>x.year == this.year);
      else
        this.record = new PerformanceRecord("", "", "", "", "", "", "", "");
      debugger;
    }

}
