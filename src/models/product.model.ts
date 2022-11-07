import { RowDataPacket, ResultSetHeader } from 'mysql2';
import mysql from './connection';
import { IProduct } from '../interfaces/IProduct';

export default class UserModel {
  private connection = mysql;

  async getAll(): Promise<IProduct[]> {
    const [rows] = await this.connection.execute<IProduct[] & RowDataPacket[]>(`
      SELECT
        id, name, amount, orderId FROM Trybesmith.Products
    `);

    return rows;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}