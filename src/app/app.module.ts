import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { LoginationComponent } from './Components/logination/logination.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { ClientComponent } from './Components/ClientDir/client/client.component';
import { RestaurantComponent } from './Components/RestaurantDir/restaurant/restaurant.component';
import { MenusectionComponent } from './Components/RestaurantDir/menusection/menusection.component';
import { MealComponent } from './Components/RestaurantDir/meal/meal.component';
import { OrderForClientComponent } from './Components/ClientDir/order-for-client/order-for-client.component';
import { OrderForRestaurantComponent } from './Components/RestaurantDir/order-for-restaurant/order-for-restaurant.component';
import { ResponsesComponent } from './Components/responses/responses.component';
import { AdminComponent } from './Components/admin/admin.component';
import { CreateOrderComponent } from './Components/ClientDir/create-order/create-order.component';

const routes: Routes = [
  {path: 'app', component: AppComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginationComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'restaurant', component: RestaurantComponent,
    children: [
      {path: 'menuSection', component: MenusectionComponent},
      {path: 'meal', component: MealComponent},
      {path: 'ordersRestaurant', component: OrderForRestaurantComponent}
    ]},
  {path: 'client', component: ClientComponent,
    children: [
      {path: 'ordersClient', component: OrderForClientComponent},
      {path: 'createOrder', component: CreateOrderComponent}
    ]},
  {path: 'responses', component: ResponsesComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginationComponent,
    RegistrationComponent,
    ClientComponent,
    RestaurantComponent,
    MenusectionComponent,
    MealComponent,
    OrderForClientComponent,
    OrderForRestaurantComponent,
    ResponsesComponent,
    AdminComponent,
    CreateOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
