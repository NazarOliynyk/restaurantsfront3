import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';
import {ClientControllerService} from '../../../controllerServices/client-controller.service';
import {Client} from '../../../models/Client';
import {HttpHeaders} from '@angular/common/http';
import {OrderMeal} from '../../../models/OrderMeal';
import {Restaurant} from '../../../models/Restaurant';
import {Meal} from '../../../models/Meal';

@Component({
  selector: 'app-order-for-client',
  templateUrl: './order-for-client.component.html',
  styleUrls: ['./order-for-client.component.css']
})
export class OrderForClientComponent implements OnInit {

  client: Client = new Client();
  showRestaurantList = true;
  restaurants: Restaurant[] = [];
  restaurant: Restaurant;
  headersOption: HttpHeaders;
  meal: Meal = new Meal();
   mealsOfOrder: Meal[] = [];
  order: OrderMeal = new OrderMeal();
  orders: OrderMeal[] = [];
  showOrderList = false;
  showMealsOfOrder = false;
  reasonOfCancelationInput = false;
  reasonOfCancelation = '';
  responsePositiveString = '';
  responsePositiveInput = false;
  responseNegativeInput = false;
  responseNegativeString = '';


  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe((data: Client) => {
      this.client = data;
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.watchAllOrders();
      this.mainControllerService.getRestaurants(this.headersOption).
      subscribe(restaurants => {this.restaurants = restaurants; });

    });
  }

  watchAllOrders() {

    this.mainControllerService.getClientOrders(this.client.id, this.headersOption).
    subscribe(orders => {this.orders = orders; });
  }

  getOrderMeals(o: OrderMeal) {
    this.order = o;
    this.showMealsOfOrder = true;
    this.showRestaurantList = false;
    this.showOrderList = true;
    this.clientControllerService.getMealsOfOrder(o.id, this.headersOption).
    subscribe(mealsList => {this.mealsOfOrder = mealsList; } );
  }

  deleteOrder(o: OrderMeal) {
    this.clientControllerService.deleteOrder(o.id, this.headersOption).
    subscribe(data => {alert( data.text);
                       this.watchAllOrders(); },
      error1 => {alert('Failed to delete'); });
  }

  cancelOrder(o: OrderMeal) {
    this.order = o;
    this.reasonOfCancelationInput = true;
    this.responseNegativeInput = false;
    this.responsePositiveInput = false;
  }

  cancellTotally(reasonOfCancelationForm: HTMLFormElement) {
    this.clientControllerService.cancelOrderByClient(
      this.order.id, this.reasonOfCancelation, this.headersOption).
    subscribe(cancelation => {alert( cancelation.text);
                              this.watchAllOrders();
                              this.reasonOfCancelationInput = false; },
      error1 => alert( 'ERROR: Failed to change status'));
  }

  orderServed(o: OrderMeal) {
    this.order = o;
    console.log(this.order);
    this.clientControllerService.confirmOrderServed(this.order.id, 'Posted to served', this.headersOption).
    subscribe(value => {alert( value.text);
                        this.watchAllOrders(); },
      error1 => alert('ERROR: Failed to change status'));
  }


  positiveResponse(o: OrderMeal) {
    this.order = o;
    this.responsePositiveInput = true;
    this.reasonOfCancelationInput = false;
    this.responseNegativeInput = false;
  }

  makePositiveResponse(responsePositiveForm: HTMLFormElement) {
    this.clientControllerService.positiveFromClient(
      this.order.id, this.responsePositiveString, this.headersOption).
    subscribe(res => {alert( res.text);
                      this.watchAllOrders();
                      this.responsePositiveInput = false; },
      error1 => alert( 'ERROR: Failed to change status'));
  }

  negativeResponse(o: OrderMeal) {
    this.order = o;
    this.responseNegativeInput = true;
    this.reasonOfCancelationInput = false;
    this.responsePositiveInput = false;
  }

  makeNegativeResponse(responseNegativeForm: HTMLFormElement) {
    this.clientControllerService.negativeFromClient(
      this.order.id, this.responseNegativeString, this.headersOption).
    subscribe(res => {alert( res.text);
                      this.watchAllOrders();
                      this.responseNegativeInput = false; },
      error1 => alert( 'ERROR: Failed to change status'));
  }

  closeReasonOfCancelation() {
    this.reasonOfCancelationInput = false;
  }

  closeResponsePositive() {
    this.responsePositiveInput = false;
  }

  closeResponseNegative() {
    this.responseNegativeInput = false;
  }

  closeShowMeals() {
    this.showMealsOfOrder = false;
  }
}
