import { Status } from './../models/Status';
import { Approval } from '../models/Approval';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) { }
  fetchEmployees(){
      return this.client.get<Observable<HttpResponse<any>>>('api/control/fetchemployees')
  }
  fetchSalesOrders(){
    return this.client.get<Observable<HttpResponse<any>>>('api/control/getallsalesorders')
  }
  fetchCustomers(){
    return this.client.get<Observable<HttpResponse<any>>>('api/control/getallcustomers')
  }
  fetch(){
     return [this.fetchEmployees(),this.fetchSalesOrders(),this.fetchCustomers()]  
  }

  aproveBonus(_id:string,status){
    return this.client.put<HttpResponse<any>>('api/record/approve',{_id,status})
  }
}
