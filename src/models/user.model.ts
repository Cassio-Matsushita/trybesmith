import { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  private connection = mysql;

  async getAll(): Promise<IUser[]> {
    const [rows] = await this.connection.execute<IUser[] & RowDataPacket[]>(`
      SELECT
        id, username, classe, level FROM Trybesmith.Users
    `);

    return rows;
  }

  public async create(user: IUser): Promise<IUser> {
    const { username, classe, level, password } = user;

    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}