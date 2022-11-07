import jsonwebtoken from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';
import UserModel from '../models/user.model';

export default class UserService {
  public user = new UserModel();

  public jwt = jsonwebtoken;

  public async getAll(): Promise<IUser[]> {
    const users = await this.user.getAll();
    return users;
  }

  public generateToken(user: IUser) {
    const payload = { 
      id: user.id,
      username: user.username,
      classe: user.classe,
      level: user.level,
      password: user.password,
    }; 
    return this.jwt.sign(payload, process.env.JWT_SECRET as string, {
      algorithm: 'HS256',
      expiresIn: '1d' });
  }

  public create(userData: IUser): Promise<IUser> {
    return this.user.create(userData);
  }
}