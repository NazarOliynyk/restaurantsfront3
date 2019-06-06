import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';
import {ClientControllerService} from '../../../controllerServices/client-controller.service';
import {OrderMeal} from '../../../models/OrderMeal';
import {Restaurant} from '../../../models/Restaurant';
import {Client} from '../../../models/Client';
import {Meal} from '../../../models/Meal';
import {RouterTruck} from '../../../models/RouterTruck';

@Component({
  selector: 'app-order-for-restaurant',
  templateUrl: './order-for-restaurant.component.html',
  styleUrls: ['./order-for-restaurant.component.css']
})
export class OrderForRestaurantComponent implements OnInit {


  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  showRestaurantList = true;
  headersOption: HttpHeaders;
  meal: Meal = new Meal();
  mealsOfOrder: Meal[] = [];
  order: OrderMeal = new OrderMeal();
  orders: OrderMeal[] = [];
  // showOrderList = true;
  showMealsOfOrder = false;
  reasonOfCancelationInput = false;
  reasonOfCancelation = '';
  responsePositiveString = '';
  responsePositiveInput = false;
  responseNegativeInput = false;
  responseNegativeString = '';
  // showClientInfo = false;
  routerTruck: RouterTruck;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.mainControllerService.getRestaurantOrders(this.restaurant.id, this.headersOption).
    subscribe(orders => {this.orders = orders; });
  }


  getOrderMeals(o: OrderMeal) {
    this.order = o;
    this.showMealsOfOrder = true;
    this.showRestaurantList = false;
    // this.showOrderList = false;
    this.clientControllerService.getMealsOfOrder(o.id, this.headersOption).
    subscribe(mealsList => {this.mealsOfOrder = mealsList; } );
  }

  // getInfoAboutClient(order: OrderMeal) {
  //   this.showClientInfo = true;
  //   this.restaurantControllerService.findClientByOrderId(order.id, this.headersOption).
  //   subscribe(client => {this.client = client; });
  // }

  acceptToKitchen(order: OrderMeal) {
    console.log(order.id);
    this.restaurantControllerService.acceptOrderToKitchen(order, this.headersOption).
    subscribe(res => {alert(res.text); },
      error1 => {alert('Failed to accept order to kitchen'); });
  }

  deleteOrder(order: OrderMeal) {
    this.restaurantControllerService.deleteOrderByRestaurant(
      order.id, this.headersOption).
    subscribe(res => {alert( res.text); },
      error1 => alert('Failed to delete'));
  }

  cancelOrder(order: OrderMeal) {
    this.order = order;
    this.reasonOfCancelationInput = true;
    this.responseNegativeInput = false;
    this.responsePositiveInput = false;
  }

  cancellTotally(reasonOfCancelationForm: HTMLFormElement) {
    this.restaurantControllerService.cancelOrderByRestaurant(
      this.order.id, this.reasonOfCancelation, this.headersOption).
    subscribe(res => {alert( res.text); },
      error1 => alert( 'ERROR: Failed to cancel order') );
  }

  positiveResponse(order: OrderMeal) {
    this.order = order;
    this.responsePositiveInput = true;
    this.responseNegativeInput = false;
    this.reasonOfCancelationInput = false;
  }

  makePositiveResponse(responsePositiveForm: HTMLFormElement) {
    this.restaurantControllerService.positiveFromRestaurant(
      this.order.id, this.responsePositiveString, this.headersOption).
    subscribe(res => {alert( res.text); },
      error1 => alert( 'ERROR: Failed to change status'));
  }

  negativeResponse(order: OrderMeal) {
    this.order = order;
    this.responseNegativeInput = true;
    this.responsePositiveInput = false;
    this.reasonOfCancelationInput = false;
  }

  makeNegativeResponse(responseNegativeForm: HTMLFormElement) {
    this.restaurantControllerService.negativeFromRestaurant(
      this.order.id, this.responseNegativeString, this.headersOption).
    subscribe(res => {alert( res.text); },
      error1 => alert( 'ERROR: Failed to change status'));
  }

  showResponses(restaurant: Restaurant, client: Client) {
    this.restaurant = restaurant;
    this.client = client;
    this.routerTruck = new RouterTruck(this.restaurant.id, this.client.id, 'restaurant');

    this.router.navigate(['responses'], {queryParams: this.routerTruck});
  }
}
