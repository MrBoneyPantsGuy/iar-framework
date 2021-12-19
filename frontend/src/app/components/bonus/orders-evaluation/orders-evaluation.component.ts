import { Component, OnInit,Input } from '@angular/core';
import { ClientRankingEnum } from '../models/clientRankingEnum';
import { OrdersEvaluation } from '../models/ordersEvaluation';
import {OrdersRecord} from "../../../../../../backend/src/models/OrdersRecord.js";
@Component({
  selector: 'app-orders-evaluation',
  templateUrl: './orders-evaluation.component.html',
  styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit {
  clientRankings = ClientRankingEnum;
  enumKeys:any[];
  @Input() orders: OrdersRecord[];
  constructor() {
    this.orders =[];
   console.log(this.orders);
  }



  ngOnInit() {
  }
}
