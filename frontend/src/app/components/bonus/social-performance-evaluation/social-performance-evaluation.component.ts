import { SocialPerformanceEvaluation } from './../models/socialPerformanceEvaluation';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-social-performance-evaluation',
  templateUrl: './social-performance-evaluation.component.html',
  styleUrls: ['./social-performance-evaluation.component.css']
})
export class SocialPerformanceEvaluationComponent implements OnInit {
  @Input() social: SocialPerformanceEvaluation[];
  constructor() {
    this.social = [];
    /*var s = new SocialPerformanceEvaluation();
    s.competence = "Leader";
    this.social.push(s);*/
   }

  ngOnInit(): void {
  }

}
