import { PerformanceRecordService } from './../../services/performance-record.service';
import { SalesmanService } from './../../services/salesman.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  overviewGraph 
  lastPerformanceGraph
 user:User
 salesman
 records
  constructor(private userService:UserService,private salesmanService:SalesmanService,private recordService: PerformanceRecordService) { }
    
  async ngOnInit() {
    this.user = await this.getUser()
    console.log(this.user)
    this.salesman = await this.getSalesman(this.user.lastname)
   // console.log(this.salesman)
     this.records = await this.recordService.getPerformanceRecord(this.salesman[0].employeeId).toPromise().then(x=>{return x.body;});
    console.log(this.records)
    await this.buildGraph()
    console.log(this.overviewGraph)
  }
 async buildGraph(){
   var x = []
   var y =[]
  var x1 = []
  var y1=[]
  //Sort records ASC
  this.records.sort(function(a, b) {
    return a.year - b.year;
  });
  
   this.records.forEach(record=>{
      x.push(record.year)
      y.push(record.totalBonusA + record.totalBonusB)
   })
  var lastPerformance = this.records[this.records.length-1]
  console.log("lp"+lastPerformance)
  lastPerformance.orderRecords.forEach(p =>{
      x1.push(p.client)
      y1.push(p.bonus)
  })
  lastPerformance.socialRecords.forEach(p =>{
    console.log(p)
    x1.push(p.competence)
    y1.push(p.bonus)
})
  this.overviewGraph = {
    data:  [
        { x: x, y: y, type: 'bar', marker: {color: '#3f51b5'} },
        //{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
    ],
    layout: {width:640, height: 500, title: 'Boni'}
};
this.lastPerformanceGraph = {
  data:  [
      { x: x1, y: y1, type: 'bar', marker: {color: 'grey'} },
      //{ x: [1, 2, 3], y: [2, 5, 3], type: 'bar' },
  ],
  layout: {width:640, height: 500, title: 'Last Performance Detail'}
};
 }
  async getUser(){
    return this.userService.getOwnUser().toPromise()
  }
  async getSalesman(search){
    return this.salesmanService.getSalesmans().toPromise()
    .then(all => all.body.filter(x=>
      
      x.lastname.includes(search)))
  }
   userIsCeoOrHr(){
    console.log("user:"+ this.user)
    return 2 > this.user.role
   }

}
