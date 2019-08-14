
import {MenuSection} from './MenuSection';
import {Restaurant} from './Restaurant';
import {OrderMeal} from './OrderMeal';
// import {Avatar} from './Avatar';

export class Meal {

  public id = 0;
  public name = '';
  public description = '';
  public quantity = '';
  public price = 0;
  public menuSection: MenuSection;
  public restaurant: Restaurant = new Restaurant();
  public orders: OrderMeal [] = [];
  public avatar = 'DefaultMeal.jpg';


  constructor() {
  }
}
