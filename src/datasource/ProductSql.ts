import { SQLDataSource } from 'datasource-sql';
import Knex from 'knex';

export class ProductSql extends SQLDataSource {
  knex: Knex;

  constructor(config: any) {
    super(config);
    this.knex = Knex(config);
  }

  async getProduct(id: number) {
    return this.knex
      .table('products')
      .where({ id })
      .first()
      .cache(60);
  }
}
