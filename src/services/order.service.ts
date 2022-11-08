import jsonwebtoken from 'jsonwebtoken';
import { IOrder } from '../interfaces/IOrder';
import OrderModel from '../models/order.model';

export default class UserService {
  public order = new OrderModel();

  public jwt = jsonwebtoken;

  public async getAll(): Promise<IOrder[]> {
    const orders = await this.order.getAll();
    return orders;
  }
}