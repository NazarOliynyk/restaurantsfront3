
import {User} from './User';
import {MenuSection} from './MenuSection';
import {Meal} from './Meal';
import {OrderMeal} from './OrderMeal';

export class Restaurant extends User {

  constructor(
    public id: number = 0,
    public username: string = '',
    public password: string = '',
    public name: string = '',
    public address: string = '',
    public email: string = '',
    public phoneNumber: string = '',
    public additionalInfo: string = '',
    public restaurantPositiveResponses: number = 0,
    public restaurantNegativeResponses: number = 0,
    public menuSections: MenuSection [] = [],
    public meals: Meal [] = [],
    public orders: OrderMeal [] = []
  ) { super(id, username, password , email); }
}
