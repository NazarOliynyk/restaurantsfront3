import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';
import {ClientControllerService} from '../../../controllerServices/client-controller.service';
import {Client} from '../../../models/Client';
import {Restaurant} from '../../../models/Restaurant';
import {HttpHeaders} from '@angular/common/http';
import {Meal} from '../../../models/Meal';
import {MenuSection} from '../../../models/MenuSection';
import {OrderMeal} from '../../../models/OrderMeal';
import {RouterTruck} from '../../../models/RouterTruck';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  client: Client = new Client();
  restaurants: Restaurant[] = [];
  restaurant: Restaurant;
  headersOption: HttpHeaders;
  meal: Meal = new Meal();
  mealsOfRestaurant: Meal[] = [];
  menuSection: MenuSection = new MenuSection();
  menuSections: MenuSection [] = [];
  mealsOfMS: Meal [] = [];
  mealsToBeAdded: Meal[] = [];
  order: OrderMeal = new OrderMeal();
  showRestaurantList = true;
  eur: number;
  usd: number;
  pln: number;
  showFillOrder = false;
  showPreliminaryMenu = false;
  ids: number[] = [];
  total = 0;
  routerTruck: RouterTruck;

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
      this.mainControllerService.getRestaurants(this.headersOption).
      subscribe(restaurants => {this.restaurants = restaurants; });

    });
  }

  goToThisRestaurant(r: Restaurant) {
    this.restaurant = r;
    this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
    subscribe(value => {this.menuSections = value; },
      error1 => alert('Failed to load menu sections'));

    this.mainControllerService.getMeals(this.restaurant.id, this.headersOption).
    subscribe(value => {this.mealsOfRestaurant = value; },
      error1 => alert('Failed to load meals'));

    this.showFillOrder = true;
    this.showRestaurantList = false;
    this.restaurantControllerService.getRates(this.headersOption).
    subscribe(value => {this.eur = value.eur;
                        this.usd = value.usd;
                        this.pln = value.pln; },
      error1 => alert('Failed to load rates'));
  }

  goToMenuSection(ms: MenuSection) {
    this.menuSection = ms;
    this.mealsOfMS = [];
    for (const m of this.mealsOfRestaurant) {

      if (m.menuSection.name === this.menuSection.name) {
        this.mealsOfMS.push(m);
      }
    }
  }

  addMeal(m: Meal) {
    this.total = 0;
    this.mealsToBeAdded.push(m);
    for (const meal of this.mealsToBeAdded) {
      this.total += meal.price;
    }
    this.showPreliminaryMenu = true;
  }

  removeFromPreliminaryMenu(m: Meal) {
    this.total = 0;
    const index = this.mealsToBeAdded.indexOf(m);
    this.mealsToBeAdded.splice(index, 1);
    for (const meal of this.mealsToBeAdded) {
      this.total += meal.price;
    }
  }

  createOrder() {
    for (const m of this.mealsToBeAdded) {
      this.ids.push(m.id);
    }
    this.clientControllerService.saveOrder(this.client.id, this.ids, this.headersOption).
    subscribe( value => {alert(value.text);
                         this.router.navigate(['client/ordersClient'], {queryParams: this.client}); },
      error1 => {alert('Failed to create order'); });
  }

  backToRestaurants() {
    this.showRestaurantList = true;
    this.showFillOrder = false;
  }

  goToResponses(r) {
    this.restaurant = r;
    this.routerTruck = new RouterTruck(this.restaurant.id, this.client.id, 'client');
    console.log('From createOrder: ' + this.routerTruck.restaurantId);
    console.log('From createOrder: ' + this.routerTruck.clientId);
    this.router.navigate(['responses'], {queryParams: this.routerTruck});
  }
}
