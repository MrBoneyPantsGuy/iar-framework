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
  @Input() readonly

  constructor() {
  
   }
   

    changeActual(value,item){
      console.info(value)
      this.social.find(x => x.competence == item.competence).actualValue = value;
    this.updateBonus(item)
    //this.saveChanges();
   }
   changeTarget(value,item){
    console.info(value)
    this.social.find(x => x.competence == item.competence).targetValue = value;
    this.updateBonus(item)
  //this.saveChanges();
 }
   updateBonus(item){
    this.social.find(x => x.competence == item.competence).bonus = (item.targetValue < item.actualValue)?(item.actualValue - item.targetValue)*75:10;
     console.info(item)
     console.info(this.social.find(x => x == item).bonus)
     this.saveChanges()
   }
   private saveChanges(){
    this.changedRecord.emit(this.social)
   }
  ngOnInit(): void {
    console.log("social:"+this.social)
  }

}
