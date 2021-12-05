import { Component, OnInit } from '@angular/core';
import { ClientRankingEnum } from '../models/clientRankingEnum';
import { OrdersEvaluation } from '../models/ordersEvaluation';

@Component({
  selector: 'app-orders-evaluation',
  templateUrl: './orders-evaluation.component.html',
  styleUrls: ['./orders-evaluation.component.css']
})
export class OrdersEvaluationComponent implements OnInit {
  clientRankings = ClientRankingEnum;
  enumKeys:any[];
  constructor() {
    this.enumKeys = Object.keys(this.clientRankings).filter(
      (f) => !isNaN(Number(f))
    );
  }

  addRow() {
    const table = document.getElementById('tableA');
    table.appendChild(table.childNodes[1].cloneNode(true));
    
    document.querySelectorAll(".addBtn").forEach(e => {e.setAttribute("click","addRow()");e.addEventListener("click",this.addRow)});
  }

  ngOnInit() {
  }
}
