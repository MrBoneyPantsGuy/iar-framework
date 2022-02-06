import { Order } from 'src/app/components/bonus/models/order';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {PerformanceRecord} from "../../../../backend/src/models/PerformanceRecord.js";

@Injectable({
  providedIn: 'root'
})
export class PerformanceRecordService {
  client: HttpClient;
 
  constructor(http:HttpClient) { this.client=http;}

    //getSalesmanByEmployeeId(id:string):Observable<HttpResponse<OrdersRecord>>{  return  this.client.get<OrdersRecord>('api/salesman/employeeid/'+id, {observe: 'response'})};
    getPerformanceRecord(id:string):Observable<HttpResponse<PerformanceRecord[]>>{  
      return  this.client.get<PerformanceRecord[]>('api/record/'+id, {observe: 'response'})};
      updatePerformanceRecord(record:PerformanceRecord){  
        return  this.client.put<PerformanceRecord>('api/record',record,{headers: new HttpHeaders({Accept:"text/html"})}).subscribe(d => console.log(d))};

  

 
}