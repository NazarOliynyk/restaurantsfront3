
import {User} from './User';
import {OrderMeal} from './OrderMeal';

export class Client extends User {

  constructor(
    public id: number = 0,
    public username: string = '',
    public password: string = '',
    public email: string = '',
    public clientPositiveResponses: number = 0,
    public clientNegativeResponses: number = 0,
    public orders: OrderMeal [] = []
  ) { super(id, username, password , email); }
}
