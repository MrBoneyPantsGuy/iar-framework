import { SocialPerformanceEvaluation } from './../models/socialPerformanceEvaluation';
import { Component, OnInit,Input, EventEmitter, Output } from '@angular/core';
import {SocialRecord} from "../../../../../../backend/src/models/SocialRecord.js";

@Component({
  selector: 'app-social-performance-evaluation',
  templateUrl: './social-performance-evaluation.component.html',
  styleUrls: ['./social-performance-evaluation.component.css']
})
export class SocialPerformanceEvaluationComponent implements OnInit {
  @Input() social: SocialRecord[];
  @Output() changedRecord = new EventEmitter<SocialRecord[]>();
  constructor() {
  
   }
   
   private changeBonus(bonus){
      this.social.find(x => x.competence == bonus[0].competence).bonus = bonus[1];
      this.saveChanges();
   }
   private changeRemark(remark){
    this.social.find(x => x.competence == remark[0].competence).remark = remark[1];
    this.saveChanges();
   }

   private saveChanges(){
    this.changedRecord.emit(this.social)
   }
  ngOnInit(): void {
  }

}
