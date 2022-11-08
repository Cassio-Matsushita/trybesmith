import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public userService = new UserService();

  async getAll(_req: Request, res: Response) {
    const users = await this.userService.getAll();

    res.status(200).json(users);
  }

  async create(req: Request, res: Response) {
    const user = req.body;

    const userCreated = await this.userService.create(user);
    const token = this.userService.generateToken(userCreated);
    res.status(201).json({ token });
  }
}