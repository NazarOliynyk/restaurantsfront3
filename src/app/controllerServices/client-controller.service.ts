import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseTransfer} from '../Models/ResponseTransfer';
import {Meal} from '../Models/Meal';

@Injectable({
  providedIn: 'root'
})
export class ClientControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveOrder(id: number, ids: number[], headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveOrder/' + id, ids, {headers: headersOption});
  }

  deleteOrder(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteOrder/' + id, {headers: headersOption});
  }

  getMealsOfOrder(id: number, headersOption: HttpHeaders): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.url + '/getMealsOfOrder/' + id, {headers: headersOption});
  }

  cancelOrderByClient(id: number, reasonOfCancelation: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/cancelOrderByClient/' + id, reasonOfCancelation, {headers: headersOption});
  }

  confirmOrderServed(id: number, s: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/confirmOrderServed/' + id, s, {headers: headersOption});
  }

  negativeFromClient(id: number, descriptionFromClient: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/negativeFromClient/' + id, descriptionFromClient, {headers: headersOption});
  }

  positiveFromClient(id: number, descriptionFromClient: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/positiveFromClient/' + id, descriptionFromClient, {headers: headersOption});
  }
}
