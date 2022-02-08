import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/Roles';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
 user:User
  constructor(private userService:UserService) { }

   ngOnInit() {
    this.userService.getOwnUser().subscribe({next:(value)=>{console.log(value.role); if(value.role == Roles.CEO){
      alert("ceo")
    
    
    
    
  }},complete:()=>{console.log("completed");}});
   
}
   /*fetchUser(){
     this.userService.getOwnUser().subscribe({next:(value)=>{console.log(value)},complete:()=>{console.log("completed");}});
   
  }*/
}
