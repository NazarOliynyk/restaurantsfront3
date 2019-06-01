import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AdminComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
