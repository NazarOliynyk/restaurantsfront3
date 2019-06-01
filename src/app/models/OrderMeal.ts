import {Client} from './Client';
import {Restaurant} from './Restaurant';
import {Meal} from './Meal';


export class OrderMeal {

  constructor(
    public id: number = 0,
    public date: Date = new Date(),
    public reasonOfCancelation: string = '',
    public descriptionFromClient: string = '',
    public descriptionFromRestaurant: string = '',
    public orderStatus: OrderStatus = null,
    public responseFromClient: TypeOfResponse = null,
    public responseFromRestaurant: TypeOfResponse = null,
    public client: Client = new Client(),
    public restaurant: Restaurant = new Restaurant(),
    public meals: Meal [] = []
  ) { }
}
