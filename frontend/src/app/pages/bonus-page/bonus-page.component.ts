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
import {Salesman} from "../../../../../backend/src/models/Salesman.js";
import { Console } from 'console';
import {OrdersRecord} from "../../../../../backend/src/models/OrdersRecord.js";
import { asLiteral } from '@angular/compiler/src/render3/view/util';
 
const sale = require('../../../../../backend/src/models/Salesman.js');
const ord = require('../../../../../backend/src/models/OrdersRecord.js');

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
  bonus: Bonus;
  salesmanservice: SalesmanService;
  orderservice: OrderService;
  salesman:Salesman;
  allsalesman:Salesman[];
  filteredSalesman:Salesman[];
  orders:OrdersRecord[];
  bonusYears:number[];

  //TODO fetch Infos from backnd
  constructor(http:HttpClient) {
    this.salesmanservice = new SalesmanService(http);
    this.orderservice = new OrderService(http);
  }

  async ngOnInit() {
    this.bonusYears = [];
    this.orders = [];
    this.allsalesman = [];
    this.filteredSalesman = [];
    
    this.salesman =   sale.constructor("salesmanId", "firstname", "lastname", "employeeId", "department", "governmentId");
    this.salesman = await this.salesmanservice.getSalesmanByEmployeeId("84").toPromise().then(e=>{console.log("obj:",e.body.firstname);return e.body;});
    this.allsalesman.push(await this.salesmanservice.getSalesmans().toPromise().then(x=>{return x.body;}));
    this.orders = await this.orderservice.getOrdersRecord().toPromise().then(x=>{return x.body;});
    //console.log(this.allsalesman[0]);
    
    
    
    
    //debugger;
    this.bonus = new Bonus();
    this.bonus.emplInfo = new EmployeeInfo(this.salesman.firstname+" "+this.salesman.lastname,this.salesman.employeeId,this.salesman.department);
    console.log(this.orders);
    
    this.bonus.partA = this.orders.filter(x=>x.governmentId == this.salesman.governmentId);
    var latest = this.latestYear(this.bonus.partA,);
    debugger;
    this.bonus.partA = this.bonus.partA.filter(x=>x.year == ""+latest);
    debugger;
    this.bonus.partB = [];
    
    this.bonus.year = ""+latest;
    //Employee Infos
    //this.bonus.emplInfo.name = "bp";

    //PartA
   /* var ord = new Order();
    var b = new Order();
    
    ord.client = "Client A";
    ord.clientRanking = 1;
    b.itemsSold = "5";
    this.bonus.partA.push(ord);
    this.bonus.partA.push(b);*/
    //PartB
    var s = new SocialPerformanceEvaluation();
    s.competence = "Leader";
    this.bonus.partB.push(s);
    //this.info = this.bonus.emplInfo;
  }

   search(searchtext:string){
    this.filteredSalesman = this.allsalesman[0].filter(x=>x.firstname.includes(searchtext));
    if(this.filteredSalesman.length == 1){
      this.salesman = this.filteredSalesman[0];
      debugger;
      console.log(this.salesman.firstname);
      //this.bonus.emplInfo.name = this.salesman.firstname;
      this.updateUI();
    }

   
  
  }

  latestYear(year:string[],x:number=2000){
    
    year.forEach(y=>{
      var yearNumber = Number.parseInt(y["year"]);
      this.bonusYears.push(yearNumber);
      debugger;
      if(yearNumber>x)
        x=yearNumber
    });
    this.bonusYears = [...new Set(this.bonusYears)].sort((a,b)=>b-a);
    debugger;
    
     return x; 
  }
  changedYear(selected:number){
    //alert(selected);
    this.bonus.partA = this.orders.filter(x=>x.governmentId == this.salesman.governmentId).filter(x=>x.year == ""+selected);
    this.bonus.year = ""+selected;
  }
  updateUI(){
      this.bonus.emplInfo = new EmployeeInfo(this.salesman.firstname+" "+this.salesman.lastname,this.salesman.employeeId,this.salesman.department);
      this.bonus.partA = this.orders.filter(x=>x.governmentId == this.salesman.governmentId);
      var latest = this.latestYear(this.bonus.partA,);
      debugger;
      this.bonus.partA = this.bonus.partA.filter(x=>x.year == ""+latest);
      this.bonus.year = ""+latest;
  }
 
}
