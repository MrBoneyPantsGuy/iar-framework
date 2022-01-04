import { Order } from 'src/app/components/bonus/models/order';
import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Observer} from 'rxjs';
import {OrdersRecord} from '../../../../backend/src/models/OrderRecord.js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  client: HttpClient;

  constructor(http:HttpClient) { this.client=http;}
    //getSalesmanByEmployeeId(id:string):Observable<HttpResponse<OrdersRecord>>{  return  this.client.get<OrdersRecord>('api/salesman/employeeid/'+id, {observe: 'response'})};
    getOrdersRecord():Observable<HttpResponse<OrdersRecord[]>>{  return  this.client.get<OrdersRecord[]>('api/control/getallsalesorders', {observe: 'response'})};



}
