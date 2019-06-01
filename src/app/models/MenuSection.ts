import {Meal} from './Meal';
import {Restaurant} from './Restaurant';

export class MenuSection {

  constructor(
    public id: number = 0,
    public name: string = '',
    public restaurant: Restaurant = new Restaurant(),
    public meals: Meal [] = []
  ) { }
}
