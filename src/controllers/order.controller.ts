import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class UserController {
  public orderService = new OrderService();

  async getAll(_req: Request, res: Response) {
    const orders = await this.orderService.getAll();

    res.status(200).json(orders);
  }
}