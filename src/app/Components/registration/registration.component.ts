import { Component, OnInit } from '@angular/core';
import {MainControllerService} from '../../controllerServices/main-controller.service';
import {Restaurant} from '../../models/Restaurant';
import {Client} from '../../models/Client';
import {RestaurantControllerService} from '../../controllerServices/restaurant-controller.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  restaurant: Restaurant = new Restaurant();
  client: Client = new Client();
  responseRegistration = '';
  chooseFormRestaurant = false;
  chooseFormClient = false;
  modal;

  constructor(
    private mainControllerService: MainControllerService
  ) { }

  ngOnInit() {
    this.modal = document.getElementById('modalMessage');
  }

  regRest() {
    this.chooseFormRestaurant = true;
    this.chooseFormClient = false;
  }

  regClient() {
    this.chooseFormClient = true;
    this.chooseFormRestaurant = false;
  }

  registerRestaurant(formRegisterR: HTMLFormElement) {
    console.log(this.restaurant.username);
    console.log(this.restaurant.password);
    console.log(this.restaurant.email);

    this.mainControllerService.saveRestaurant(this.restaurant)
      .subscribe(value => {
          this.showModal(value.text); },
        error1 => { console.log(error1);
                    this.showModal('Registration Failed'); } );
  }

  registerClient(formRegisterC: HTMLFormElement) {
    console.log(this.client.username);
    console.log(this.client.username);
    console.log(this.client.email);

    this.mainControllerService.saveClient(this.client)
      .subscribe(value => {
          this.showModal(value.text); },
        error1 => { console.log(error1);
                    this.showModal('Registration Failed'); } );
  }

  showModal(message: string) {
    this.responseRegistration = message;
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }


}
