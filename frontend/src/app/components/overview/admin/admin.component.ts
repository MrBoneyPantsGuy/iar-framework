import { PerformanceRecordService } from './../../../services/performance-record.service';
import { AdminService } from '../../../services/admin.service';
import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import {PerformanceRecord} from './../../../../../../backend/src/models/PerformanceRecord'
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 @Input() record:PerformanceRecord
  @Input() user:Observable<User>
  isCeo:boolean = false
  constructor(private userService:UserService,private adminService:AdminService,private recordService:PerformanceRecordService) {
    //this.userService.getOwnUser().subscribe({next:(user)=>this.user = user})
    console.log("user" + this.user)
    
   }

  async ngOnInit() {
    //this.userService.getOwnUser().subscribe({next:(value)=>{console.log(value.role); this.user=value;}});
    this.isCeo = await this.userIsCeo()
  }

  fetchData(){
      /*this.adminService.fetchEmployees().subscribe({
        complete:()=>{
          alert("Fetched successfully")
        },
        error:(error)=>{
          console.error(error);
          alert("Failed fetching!")
        }
      })*/
      this.adminService.fetch().forEach(x => x.subscribe({
        complete:()=>{console.log(x + "Finished fetch");console.log(x)},
        error:(error) => {alert("Failed fetch!");console.error(error)}
      }))
      alert("Everything was fetched")
  }

  async aproveBonus(){
    var role = {}
    if(await this.userIsCeo()){
      role["ceo"] = true;
    }else if(await this.userIsHr()){
      role["hr"] = true;
    }else if(await this.userIsSalesman()){
      role["salesman"] = true;
    }
    this.adminService.aproveBonus(this.record._id,role).subscribe({
      complete:()=>{
        alert("Bonus aproved")
      },
      next:(val)=>{console.log(val)},
    error:(error)=>{
      alert("Failed to aprove the bonus!")
      console.error(error)
    }})
  }
  async userIsCeo(){
    return 0 == await this.user.pipe(
      pluck('role')
      ).toPromise();
   }
   async userIsHr(){
    return 1 == await this.user.pipe(
      pluck('role')
      ).toPromise();
   }
   async userIsSalesman(){
    return 2 == await this.user.pipe(
      pluck('role')
      ).toPromise();
   }

}
