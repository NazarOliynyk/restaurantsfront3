import {Restaurant} from './Restaurant';
import {Meal} from './Meal';

export class Avatar {

  constructor(
    public id: number = 0,
    public image: string = '',
    public meal: Meal = null,
    public restaurant: Restaurant = null
  ) {  }
}
