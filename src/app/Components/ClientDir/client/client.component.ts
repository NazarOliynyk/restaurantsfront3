import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MainControllerService} from '../../../controllerServices/main-controller.service';
import {Client} from '../../../models/Client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {


  client: Client = new Client();
  clientToUpdate: Client = new Client();
  showUpdateForm = false;
  showInitialInfo = false;
  headersOption: HttpHeaders;
  oldPassword: string;
  newPassword: string;
  changePasswordF = false;
  modal;

  constructor(private activatedRoute: ActivatedRoute,
              private mainControllerService: MainControllerService,
              private router: Router) { }

  ngOnInit() {
    this.modal = document.getElementById('modalMessage1');
    this.activatedRoute.queryParams.subscribe((data: Client) => {
      this.client = data;
    });
    this.headersOption =
      new HttpHeaders({Authorization: localStorage.getItem('_token')});
  }

  showInitialData() {
    this.showInitialInfo = true;
    this.showUpdateForm = false;
    this.changePasswordF = false;
    this.router.navigate(['client'], {queryParams: this.client});
  }

  showUpdate() {
    this.showUpdateForm = true;
    this.showInitialInfo = false;
    this.changePasswordF = false;
    this.router.navigate(['client'], {queryParams: this.client});
  }

  changePasswordForm() {
    this.changePasswordF = true;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['client'], {queryParams: this.client});
  }

  createOrder() {
    this.changePasswordF = false;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['client/createOrder'], {queryParams: this.client});   }


  goToOrders() {
    this.changePasswordF = false;
    this.showInitialInfo = false;
    this.showUpdateForm = false;
    this.router.navigate(['client/ordersClient'], {queryParams: this.client});
  }

  updateClient(formToBeUpdated: HTMLFormElement) {
    this.clientToUpdate.id = this.client.id;
    this.clientToUpdate.username = this.client.username;
    this.clientToUpdate.password = this.client.password;

    if (this.clientToUpdate.email === '') {
      this.clientToUpdate.email = this.client.email;
    }
    this.mainControllerService.updateClient(
      this.clientToUpdate, this.headersOption).
    subscribe(value => {
        alert(value.text);
        this.mainControllerService.findClient(this.clientToUpdate.id, this.headersOption).
        subscribe(client => this.client = client); },
      error1 => alert('Failed To Update'));

  }

  sendPassword(changePasswordForm: HTMLFormElement) {
    console.log(this.oldPassword);
    console.log(this.newPassword);
    this.mainControllerService.checkPassword(
      this.client.id, this.oldPassword, this.headersOption).
    subscribe(value => { alert(value.text);
                         if (value.text === 'PASSWORD MATCHES') {
        this.clientToUpdate.id = this.client.id;
        this.clientToUpdate.username = this.client.username;
        this.clientToUpdate.email = this.client.email;
        this.clientToUpdate.password = this.newPassword;
        this.mainControllerService.changePasswordClient(this.clientToUpdate, this.headersOption).
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

      this.mainControllerService.deleteUser(this.client.id, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.router.navigate(['login']);
        },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }

  closeModal() {
    this.modal.style.display = 'none';
  }
}
