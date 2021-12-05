import { EmployeeInfo } from './../../components/bonus/models/employeeInfo';
import { Bonus } from './../../models/bonus';
import { Component, Input, OnInit, Output } from '@angular/core';
import { OrdersEvaluation } from 'src/app/components/bonus/models/ordersEvaluation';
import { SocialPerformanceEvaluation } from 'src/app/components/bonus/models/socialPerformanceEvaluation';
import { Order } from 'src/app/components/bonus/models/order';

@Component({
  selector: 'app-bonus-page',
  templateUrl: './bonus-page.component.html',
  styleUrls: ['./bonus-page.component.css']
})
export class BonusPageComponent implements OnInit {
  bonus: Bonus
  //TODO fetch Infos from backnd
  constructor() {
    this.bonus = new Bonus();
    this.bonus.emplInfo = new EmployeeInfo();
    this.bonus.partA = [];
    this.bonus.partB = [];
    
    this.bonus.year = "2021";
    //Employee Infos
    this.bonus.emplInfo.name = "bp";

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

  ngOnInit(): void {
    
  }
 
}
