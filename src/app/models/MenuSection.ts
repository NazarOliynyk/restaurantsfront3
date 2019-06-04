import {Meal} from './Meal';
import {Restaurant} from './Restaurant';

export class MenuSection {

  public id = 0;
  public name = '';
  public restaurant: Restaurant;
  public meals: Meal [] = [];

  constructor(  ) { }
}
