import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  client: HttpClient;
  constructor(client: HttpClient) {this.client=client; }
}
