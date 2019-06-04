import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../../models/Restaurant';
import {HttpHeaders} from '@angular/common/http';
import {MenuSection} from '../../../models/MenuSection';
import {Meal} from '../../../models/Meal';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  headersOption: HttpHeaders;
  menuSection: MenuSection = new MenuSection();
  menuSections: MenuSection [] = [];

  meal: Meal = new Meal();
  meals: Meal [] = [];
  showListOfMeals = false;
  showUpdateForm = false;
  mealToUpdate: Meal = new Meal();
  showFormAddMeal = false;
  priceOfMeal: any;
  name = '';
  showAvtarForm = false;
  imageToLoad: File = null;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
      this.headersOption =
        new HttpHeaders({Authorization: localStorage.getItem('_token')});
      this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
      subscribe(menuSections  => this.menuSections = menuSections);
    });

  }

  showAddForm() {
    this.showFormAddMeal = true;
    this.showListOfMeals = false;
    this.showUpdateForm = false;
    this.showAvtarForm = false;
  }

  getListOfMeals(restaurant: Restaurant) {
    this.showFormAddMeal = false;
    this.showListOfMeals = true;
    this.showUpdateForm = false;
    this.showAvtarForm = false;
    this.restaurant = restaurant;
    this.mainControllerService.getMeals(this.restaurant.id, this.headersOption).
    subscribe(data => {
      this.meals = data;
      this.showListOfMeals = true;
    });
  }

  showAvatarForm(m: Meal) {
      this.meal = m;
      this.showFormAddMeal = false;
      this.showListOfMeals = false;
      this.showUpdateForm = false;
      this.showAvtarForm = true;
  }

  saveMeal(mealForm: HTMLFormElement) {

    if (this.menuSection.name === '') {
      this.menuSection.name = this.menuSections[0].name;
    }
    this.meal.menuSection = this.menuSection;

    this.meal.price = parseFloat(this.priceOfMeal);
    this.restaurantControllerService.saveMeal(
      this.restaurant.id, this.meal, this.headersOption).
    subscribe(data => {alert( data.text); },
      error1 => {alert( 'Failed to save'); });
  }

  selected(name) {
    console.log(name);
  }

  update(meal: Meal) {
    this.showFormAddMeal = false;
    this.showListOfMeals = false;
    this.showUpdateForm = true;
    this.meal = meal;
    console.log('meal to update: ' + meal);
  }

  delete(meal: Meal) {
    this.meal = meal;
    console.log('meal to delete: ' + meal);
    this.restaurantControllerService.deleteMeal(this.meal.id, this.headersOption).
    subscribe(data => {alert(data.text);
                       this.showListOfMeals = false; },
      error1 => {alert( 'Failed to delete'); });
  }

  updateMeal(formToBeUpdated: HTMLFormElement) {
    if (this.menuSection.name === '') {
      this.menuSection.name = this.meal.menuSection.name;
    }
    this.mealToUpdate.id = this.meal.id;
    this.mealToUpdate.menuSection = this.menuSection;
    if (this.mealToUpdate.name === '') {
      this.mealToUpdate.name = this.meal.name; }
    if (this.mealToUpdate.description === '') {
      this.mealToUpdate.description = this.meal.description; }
    if (this.mealToUpdate.quantity === '') {
      this.mealToUpdate.quantity = this.meal.quantity; }
    if (this.mealToUpdate.price === 0) {
      this.mealToUpdate.price = this.meal.price; }
    this.mealToUpdate.avatar = this.meal.avatar;
    this.restaurantControllerService.saveMeal(
      this.restaurant.id, this.mealToUpdate, this.headersOption).
    subscribe(data => {alert( data.text);
                       this.showUpdateForm = false; },
      error1 => {alert( 'Failed to update'); });
  }
  handleFileInput(files: FileList) {
    this.imageToLoad = files.item(0);
  }


  saveAvatar(avatarForm: HTMLFormElement) {
    if (this.imageToLoad !== null) {
      const formData: FormData = new FormData();
      formData.append('file', this.imageToLoad);
      this.restaurantControllerService.saveAvatarToMeal(this.meal.id, formData, this.headersOption).
      subscribe(data => {alert( data.text);  },
        error1 => alert( 'Failed to save!'));
    }
  }


  deleteAvatar() {
    console.log('DELETE AVATAR');
    this.restaurantControllerService.deleteAvatarFromMeal(this.meal.id, this.headersOption).
    subscribe(value => {alert(value.text); },
      error1 => alert('Failed to delete image'));
  }
}
