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
import { AuthGuardService } from 'src/app/services/auth-guard.service';
const sale = require('../../../../../backend/src/models/Salesman.js');


@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
  bonus: Bonus;
  salesmanservice: SalesmanService;
  salesman:Salesman;
  allsalesman:Salesman[]

  //TODO fetch Infos from backnd
  constructor(http:HttpClient) {
    this.salesmanservice = new SalesmanService(http);
  }

  async ngOnInit() {
   
    this.allsalesman = [];
    this.salesman =   sale.constructor("salesmanId", "firstname", "lastname", "employeeId", "department", "governmentId");
    this.salesman = await this.salesmanservice.getSalesmanByEmployeeId("31").toPromise().then(e=>{console.log("obj:",e.body.firstname);return e.body;});
    this.allsalesman.push(await this.salesmanservice.getSalesmans().toPromise().then(x=>{return x.body;}));
    console.log(this.allsalesman[0]);
    
    
    debugger;
    this.bonus = new Bonus();
    this.bonus.emplInfo = new EmployeeInfo(this.salesman.firstname,this.salesman.employeeId,this.salesman.department);
    this.bonus.partA = [];
    this.bonus.partB = [];
    
    this.bonus.year = "2021";
    //Employee Infos
    //this.bonus.emplInfo.name = "bp";

    //PartA
    var ord = new Order();
    var b = new Order();
    
    ord.client = "Client A";
    ord.clientRanking = 1;
    b.itemsSold = "5";
    this.bonus.partA.push(ord);
    this.bonus.partA.push(b);
    //PartB
    var s = new SocialPerformanceEvaluation();
    s.competence = "Leader";
    this.bonus.partB.push(s);
    //this.info = this.bonus.emplInfo;
  }
 
}
