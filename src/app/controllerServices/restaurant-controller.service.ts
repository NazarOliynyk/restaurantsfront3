import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../Models/Client';
import {MenuSection} from '../Models/MenuSection';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';
import {ResponseTransfer} from '../Models/ResponseTransfer';

@Injectable({
  providedIn: 'root'
})
export class RestaurantControllerService {

  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveMenuSection(id: number, menuSection: MenuSection, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveMenuSection/' + id, menuSection, {headers: headersOption});
  }

  deleteMenuSection(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteMenuSection/' + id, {headers: headersOption});
  }

  saveMeal(id: number, meal: Meal, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveMeal/' + id , meal, {headers: headersOption});
  }

  deleteMeal(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteMeal/' + id, {headers: headersOption});
  }

  saveAvatar(id: number, image: FormData, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/saveAvatar/' + id, image, {headers: headersOption});
  }

  deleteAvatar(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteAvatar/' + id, {headers: headersOption});
  }

  findClientByOrderId(id: number, headersOption: HttpHeaders): Observable<Client> {
    return this.http.get<Client>(
      this.url + '/findClientByOrderId/' + id, {headers: headersOption});
  }

  acceptOrderToKitchen(order: OrderMeal, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(
      this.url + '/acceptOrderToKitchen/' + order.id, order.id , {headers: headersOption});
  }

  cancelOrderByRestaurant(
    id: number, reasonOfCancelation: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/cancelOrderByRestaurant/' + id, reasonOfCancelation, {headers: headersOption});
  }

  deleteOrderByRestaurant(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteOrderByRestaurant/' + id, {headers: headersOption});
  }

  negativeFromRestaurant(
    id: number, descriptionFromRestaurant: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/negativeFromRestaurant/' + id, descriptionFromRestaurant, {headers: headersOption});
  }

  positiveFromRestaurant(
    id: number, descriptionFromRestaurant: string, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>
    (this.url + '/positiveFromRestaurant/' + id, descriptionFromRestaurant, {headers: headersOption});
  }
}
