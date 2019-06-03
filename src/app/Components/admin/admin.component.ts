import { Component, OnInit } from '@angular/core';
import {User} from '../../models/User';
import {HttpHeaders} from '@angular/common/http';
import {MainControllerService} from '../../controllerServices/main-controller.service';
import {Client} from "../../models/Client";
import {Restaurant} from "../../models/Restaurant";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User;
  clients: Client [];
  restaurants: Restaurant [];
  headersOption: HttpHeaders;
  showClients = false;
  showRestaurants

  constructor( private mainControllerService: MainControllerService) { }

  ngOnInit(): void {

    if (localStorage.getItem('_token') !== null ) {
      this.user = JSON.parse(localStorage.getItem('_userLogged'));
      if (this.user.username === 'admin') {
        this.headersOption =
          new HttpHeaders({Authorization: localStorage.getItem('_token')});
        this.getUsers();
      }
    }
  }

  getUsers() {
    this.mainControllerService.getClients(this.headersOption).
    subscribe(value1 => {this.clients = value1;
                         this.showClients = true; },
      error1 => alert('Failed to load users'));
    this.mainControllerService.getRestaurants(this.headersOption).
    subscribe(value2 => {this.restaurants = value2;
                         this.showRestaurants = true; },
      error1 => alert('Failed to load users'));
  }

  delete(u: User) {
    if (confirm('DO YOU REALLY WANT TO DELETE the ACCOUNT of: ' + u.username + '???')) {

      this.mainControllerService.deleteUser(u.id, this.headersOption).
      subscribe(data => {
          alert(data.text);
          this.getUsers();
        },
        err => {console.log('err: ' + err.toString());
                alert('Failed to delete!'); } );
    }
  }

}
