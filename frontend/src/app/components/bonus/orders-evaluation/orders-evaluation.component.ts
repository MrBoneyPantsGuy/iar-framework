import { Component, OnInit,Input } from '@angular/core';
import { ClientRankingEnum } from '../models/clientRankingEnum';
import { OrdersEvaluation } from '../models/ordersEvaluation';
import { Order } from '../models/order';
@Component({
  selector: 'app-orders-evaluation',
  templateUrl: './orders-evaluation.component.html',
  styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit {
  clientRankings = ClientRankingEnum;
  enumKeys:any[];
  @Input() orders: Order[];
  constructor() {
   
  }



  ngOnInit() {
  }
}
