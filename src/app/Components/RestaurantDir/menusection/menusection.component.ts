import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {MenuSection} from '../../../models/MenuSection';
import {Restaurant} from '../../../models/Restaurant';
import {ActivatedRoute} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';

@Component({
  selector: 'app-menusection',
  templateUrl: './menusection.component.html',
  styleUrls: ['./menusection.component.css']
})
export class MenusectionComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  menuSections: MenuSection [] = [];
  headersOption: HttpHeaders;
  menuSection: MenuSection = new MenuSection();
  showListOfMenuSections = false;
  showUpdateForm = false;
  menuSectionToUpdate: MenuSection = new MenuSection();
  showFormAddMenuSection = true;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService
          ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
  }


  saveMenuSection(menuSectionForm: HTMLFormElement) {
    console.log(this.menuSection.name);
    this.restaurantControllerService.saveMenuSection(
      this.restaurant.id, this.menuSection, this.headersOption).
    subscribe(data => {alert( data.text);
                       this.menuSection = new MenuSection(); },
      error1 => alert( 'Failed to save!'));
  }

  getListOfMenuSections(restaurant: Restaurant) {
    this.mainControllerService.getMenuSections(this.restaurant, this.headersOption).
    subscribe(menuSections  => this.menuSections = menuSections);
    this.showListOfMenuSections = true;
  }

  update(menuSection: MenuSection) {
    this.showListOfMenuSections = false;
    this.showUpdateForm = true;
    this.menuSection = menuSection;
    this.showFormAddMenuSection = false;
  }

  updateMenuSection(formToBeUpdated: HTMLFormElement) {
    this.menuSectionToUpdate.id = this.menuSection.id;
    this.restaurantControllerService.saveMenuSection(
      this.restaurant.id, this.menuSectionToUpdate, this.headersOption).
    subscribe(data => {alert(data.text);
                       this.showUpdateForm = false;
                       this.showFormAddMenuSection = true;
                       this.menuSection = new MenuSection(); },
      error1 => alert('Failed to update!'));

  }


  delete(menuSection: MenuSection) {
    this.menuSection = menuSection;
    this.restaurantControllerService.deleteMenuSection(this.menuSection.id, this.headersOption).
    subscribe(data => { alert( data.text);
                        this.showUpdateForm = false;
                        this.showFormAddMenuSection = true;
                        this.menuSection = new MenuSection(); },
      error1 => alert('Failed To Delete') );
  }
}
