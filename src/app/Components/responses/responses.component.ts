import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../models/Restaurant';
import {Client} from '../../models/Client';
import {OrderMeal} from '../../models/OrderMeal';
import {HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../controllerServices/restaurant-controller.service';
import {ClientControllerService} from '../../controllerServices/client-controller.service';
import {RouterTruck} from '../../models/RouterTruck';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.css']
})
export class ResponsesComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  whoAsked: string;
  showResponsesOfClient = false;
  showResponsesOfRestaurant = false;
  orders: OrderMeal [] = [];
  headersOption: HttpHeaders;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private clientControllerService: ClientControllerService,
              private router: Router) { }

  ngOnInit() {
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
    this.activatedRoute.queryParams.subscribe((data: RouterTruck) => {

      console.log('this.restaurant.id: ' + data.restaurantId);
      console.log('this.client.id: ' + data.clientId);

      this.whoAsked = data.whoAsked;
      if (this.whoAsked === 'restaurant') {
        this.showResponsesOfClient = true;
        this.showResponsesOfRestaurant = false;
        this.mainControllerService.findRestaurant(data.restaurantId, this.headersOption).
        subscribe(restaurant => {this.restaurant = restaurant; });
        this.mainControllerService.findClient(data.clientId, this.headersOption).
        subscribe(client => {this.client = client; });
        this.mainControllerService.getClientOrders(data.clientId, this.headersOption).
        subscribe(orders => {this.orders = orders; });
      } else if (this.whoAsked === 'client') {
        this.showResponsesOfRestaurant = true;
        this.showResponsesOfClient = false;
        this.mainControllerService.findRestaurant(data.restaurantId, this.headersOption).
        subscribe(restaurant => {this.restaurant = restaurant; });
        this.mainControllerService.findClient(data.clientId, this.headersOption).
        subscribe(client => {this.client = client; });
        this.mainControllerService.getRestaurantOrders(data.restaurantId, this.headersOption).
        subscribe(orders => {this.orders = orders; });
      }


    });
  }

  getBackToRestaurantList() {
    this.router.navigate(['client/createOrder'], {queryParams: this.client});
  }

  getBackToOrdersList() {
    this.router.navigate(['restaurant/ordersRestaurant'], {queryParams: this.restaurant});
  }
}
