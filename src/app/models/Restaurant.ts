
import {User} from './User';
import {MenuSection} from './MenuSection';
import {Meal} from './Meal';
import {OrderMeal} from './OrderMeal';
// import {Avatar} from './Avatar';

export class Restaurant extends User {

    public id = 0;
    public username = '';
    public password = '';
    public name = '';
    public address = '';
    public email = '';
    public phoneNumber = '';
    public additionalInfo = '';
    public avatar = '';
    public restaurantPositiveResponses = 0;
    public restaurantNegativeResponses = 0;
    public menuSections: MenuSection [] = [];
    public meals: Meal [] = [];
    public orders: OrderMeal [] = [];

  constructor() {
    super();
  }
}
