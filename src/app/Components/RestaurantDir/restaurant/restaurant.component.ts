import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {Restaurant} from '../../../models/Restaurant';
import {RestaurantControllerService} from '../../../controllerServices/restaurant-controller.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  restaurantToUpdate: Restaurant = new Restaurant();
  showUpdateForm = false;
  showInitialInfo = false;
  headersOption: HttpHeaders;
  oldPassword: string;
  newPassword: string;
  changePasswordF = false;
  imageToLoad: File = null;
  showImage = false;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private restaurantControllerService: RestaurantControllerService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data: Restaurant) => {
      this.restaurant = data;
    });
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
  }

  showInitialData() {
    this.mainControllerService.findRestaurant(this.restaurant.id, this.headersOption).
    subscribe(restaurant => this.restaurant = restaurant);

    if (this.restaurant.avatar !== '') {
      this.showImage = true;
    }
    this.showInitialInfo = true;
    this.showUpdateForm = false;
    this.changePasswordF = false;
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  showUpdate() {
    this.mainControllerService.findRestaurant(this.restaurant.id, this.headersOption).
    subscribe(restaurant => this.restaurant = restaurant);
    if (this.restaurant.avatar !== '') {
      this.showImage = true;
    }
    this.showUpdateForm = true;
    this.showInitialInfo = false;
    this.changePasswordF = false;
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  changePasswordForm() {
    this.changePasswordF = true;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['restaurant'], {queryParams: this.restaurant});
  }

  goToMenuSections() {
    this.changePasswordF = false;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['restaurant/menuSection'], {queryParams: this.restaurant});   }

  goToMeals() {
    this.changePasswordF = false;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['restaurant/meal'], {queryParams: this.restaurant});
  }

  goToOrders() {
    this.changePasswordF = false;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['restaurant/ordersRestaurant'], {queryParams: this.restaurant});
  }

  updateRestaurant(formToBeUpdated: HTMLFormElement) {
    this.restaurantToUpdate.id = this.restaurant.id;
    this.restaurantToUpdate.username = this.restaurant.username;
    this.restaurantToUpdate.password = this.restaurant.password;

    if (this.restaurantToUpdate.name === '') {
      this.restaurantToUpdate.name = this.restaurant.name;
    }
    if (this.restaurantToUpdate.address === '') {
      this.restaurantToUpdate.address = this.restaurant.address;
    }
    if (this.restaurantToUpdate.email === '') {
      this.restaurantToUpdate.email = this.restaurant.email;
    }
    if (this.restaurantToUpdate.phoneNumber === '') {
      this.restaurantToUpdate.phoneNumber = this.restaurant.phoneNumber;
    }
    if (this.restaurantToUpdate.additionalInfo === '') {
      this.restaurantToUpdate.additionalInfo = this.restaurant.additionalInfo ;
    }
    this.restaurantToUpdate.avatar = this.restaurant.avatar;
    this.mainControllerService.updateRestaurant(
      this.restaurantToUpdate, this.headersOption).
    subscribe(value => {
      alert(value.text);
      this.mainControllerService.findRestaurant(this.restaurantToUpdate.id, this.headersOption).
        subscribe(restaurant => this.restaurant = restaurant); },
      error1 => alert('Failed To Update'));
  }

  handleFileInput(files: FileList) {
    this.imageToLoad = files.item(0);
  }


  saveAvatar(avatarForm: HTMLFormElement) {
    if (this.imageToLoad !== null) {
      const formData: FormData = new FormData();
      formData.append('file', this.imageToLoad);
      this.restaurantControllerService.saveAvatarToRestaurant(this.restaurant.id, formData, this.headersOption).
      subscribe(data => {alert( data.text);  },
        error1 => alert( 'Failed to save!'));
    }
  }


  deleteAvatar() {
    console.log('DELETE AVATAR');
    this.restaurantControllerService.deleteAvatarFromRestaurant(this.restaurant.id, this.headersOption).
      subscribe(value => {alert(value.text); },
      error1 => alert('Failed to delete image'));
  }

  sendPassword(changePasswordForm: HTMLFormElement) {
    console.log(this.oldPassword);
    console.log(this.newPassword);
    this.mainControllerService.checkPassword(
      this.restaurant.id, this.oldPassword, this.headersOption).
    subscribe(value => { alert(value.text);
                         if (value.text === 'PASSWORD MATCHES') {
        this.restaurantToUpdate.id = this.restaurant.id;
        this.restaurantToUpdate.username = this.restaurant.username;
        this.restaurantToUpdate.email = this.restaurant.email;
        this.restaurantToUpdate.password = this.newPassword;
        this.restaurantToUpdate.additionalInfo = this.restaurant.additionalInfo;
        this.restaurantToUpdate.address = this.restaurant.address;
        this.mainControllerService.changePasswordRestaurant(this.restaurantToUpdate, this.headersOption).
        subscribe(value1 => {alert( value1.text); },
          err => {console.log('err: ' + err.toString());
                  alert( 'Failed to update!'); } );
        this.showUpdateForm = false;
        this.changePasswordF = false;
      } else {
        alert( 'FAILED to update - PASSWORD DOES NOT MATCH');
      }
    });
  }

  deleteAccount() {
    if (confirm('DO YOU REALLY WANT TO DELETE YOUR ACCOUNT???')) {

      this.mainControllerService.deleteUser(this.restaurant.id, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.router.navigate(['login']);
        },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }
}
