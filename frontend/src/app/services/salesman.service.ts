import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {Salesman} from "../../../../backend/src/models/Salesman.js";

@Injectable({
  providedIn: 'root'
})
export class SalesmanService {
  client: HttpClient;
 
  constructor(http:HttpClient) { this.client=http;}

    getSalesmanByEmployeeId(id:string):Observable<HttpResponse<Salesman>>{  return  this.client.get<Salesman>('api/salesman/employeeid/'+id, {observe: 'response'})};
    getSalesmans():Observable<HttpResponse<Salesman[]>>{  return  this.client.get<Salesman[]>('api/salesman/', {observe: 'response'})};
  

 
}