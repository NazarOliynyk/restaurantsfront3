import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
import {Restaurant} from '../Models/Restaurant';
import {Client} from '../Models/Client';
import {MenuSection} from '../Models/MenuSection';
import {Meal} from '../Models/Meal';
import {OrderMeal} from '../Models/OrderMeal';
import {ResponseTransfer} from '../Models/ResponseTransfer';
// import {Avatar} from '../Models/Avatar';

@Injectable({
  providedIn: 'root'
})

export class MainControllerService {

  // url = 'http://localhost:8080';
  url = 'http://ec2-18-222-130-33.us-east-2.compute.amazonaws.com:8080';

  constructor(
    private http: HttpClient
  ) { }

  saveRestaurant(restaurant: Restaurant): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(this.url + '/saveRestaurant', restaurant);
  }

  saveClient(client: Client): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(this.url + '/saveClient', client);
  }

  updateRestaurant(restaurant: Restaurant, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/updateRestaurant', restaurant, {headers: headersOption});
  }

  updateClient(client: Client, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/updateClient', client, {headers: headersOption});
  }

  checkPassword(id: number, oldPassword: string, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/checkPassword/' + id, oldPassword, {headers: headersOption});
  }

  changePasswordClient(client: Client, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/changePasswordClient', client, {headers: headersOption});
  }

  changePasswordRestaurant(restaurant: Restaurant, headersOption: HttpHeaders): Observable<ResponseTransfer>  {
    return this.http.post<ResponseTransfer>(
      this.url + '/changePasswordRestaurant', restaurant, {headers: headersOption});
  }

  getLogins(): Observable<User []> {
    return this.http.get<User []>(this.url + '/getLogins');
  }

  forgotPassword(user: User): Observable<ResponseTransfer> {
    return this.http.post<ResponseTransfer>(this.url + '/forgotPassword/' + user.id, user);
  }

  login(user: User) {
    return this.http.post(this.url + '/login',
      JSON.stringify({username: user.username,
        password: user.password}),
      {observe: 'response'});
  }

  findRestaurant(id: number, headersOption: HttpHeaders): Observable<Restaurant> {
    return this.http.get<Restaurant>
    (this.url + '/findRestaurant/' + id, {headers: headersOption});
  }
  findClient(id: number, headersOption: HttpHeaders): Observable<Client> {
    return this.http.get<Client>
    (this.url + '/findClient/' + id, {headers: headersOption});
  }

  deleteUser(id: number, headersOption: HttpHeaders): Observable<ResponseTransfer> {
    return this.http.delete<ResponseTransfer>(
      this.url + '/deleteUser/' + id, {headers: headersOption});
  }

  getRestaurants(headersOption: HttpHeaders): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(
      this.url + '/getRestaurants', {headers: headersOption});
  }

  getClients(headersOption: HttpHeaders): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.url + '/getClients', {headers: headersOption});
  }

  getMenuSections(restaurant: Restaurant, headersOption: HttpHeaders): Observable<MenuSection []> {
    return this.http.get<MenuSection []> (
      this.url + '/getMenuSections/' + restaurant.id, {headers: headersOption});
  }

  getMeals(id: number, headersOption: HttpHeaders): Observable<Meal[]> {
    return this.http.get<Meal[]>(
      this.url + '/getMeals/' + id,  {headers: headersOption});
  }

  getClientOrders(id: number, headersOption: HttpHeaders): Observable<OrderMeal[]> {
    return this.http.get<OrderMeal[]>(
      this.url + '/getClientOrders/' + id, {headers: headersOption});
  }

  getRestaurantOrders(id: number, headersOption: HttpHeaders): Observable<OrderMeal[]> {
    return this.http.get<OrderMeal[]>(
      this.url + '/getRestaurantOrders/' + id, {headers: headersOption});
  }
}
