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
    return this.client.get<Observable<HttpResponse<any>>>('api/control/fetchemployees')
  }
  fetchCustomers(){
    return this.client.get<Observable<HttpResponse<any>>>('api/control/fetchemployees')
  }
  fetch(){
     return [this.fetchEmployees(),this.fetchSalesOrders(),this.fetchCustomers()]  
  }

  aproveBonus(data){
    return this.client.post<HttpResponse<any>>('',data)
  }
}
