import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/Roles';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
 user:User
   constructor(private userService:UserService) { this.user = new User(undefined,"","","","",false,"",Roles.SALES) }
  async ngOnInit() {
  }

   /*fetchUser(){
     this.userService.getOwnUser().subscribe({next:(value)=>{console.log(value)},complete:()=>{console.log("completed");}});
   
  }*/
  createUser(){
    this.userService.createUser(this.user).toPromise().then(res=>alert(res.firstname +" "+ res.lastname + "User "+res.username+" was created successfully" ))
    .catch(console.error);
  }
  setRole(event){
    this.user.role = event.target.value
    console.log(this.user.role)
  }
}
