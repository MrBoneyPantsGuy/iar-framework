import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ClientRankingEnum } from '../models/clientRankingEnum';
import { OrdersEvaluation } from '../models/ordersEvaluation';
import {OrdersRecord} from '../../../../../../backend/src/models/OrderRecord.js';
@Component({
  selector: 'app-orders-evaluation',
  templateUrl: './orders-evaluation.component.html',
  styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit {
  clientRankings = ClientRankingEnum;
  ranking = ["","excellent","very good","good"]
  @Input() orders: OrdersRecord[];
  @Output() changedRecord= new EventEmitter<OrdersRecord[]>();
  @Input() readonly
  constructor() {
  }


  ngOnInit() {
  }
  
   changeBonus(bonus){
    this.orders.find(x => x.productname == bonus[0].productname).bonus = bonus[1];
    this.saveChanges();
 }
  changeRemark(remark){
    console.log(this.orders[remark[0]])
  this.orders[remark[0]].remark = remark[1];
  this.saveChanges();
 }
 private saveChanges(){
  this.changedRecord.emit(this.orders)
 }
}
