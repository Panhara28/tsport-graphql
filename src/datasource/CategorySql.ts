import { SQLDataSource } from 'datasource-sql';
import Knex from 'knex';

export class CategorySql extends SQLDataSource {
  knex: Knex;

  constructor(config: any) {
    super(config);
    this.knex = Knex(config);
  }

  async getCategoryList() {
    return this.knex.table('product_category').cache(60);
  }

  async getCategory(id: number) {
    return this.knex
      .table('product_category')
      .where({ id })
      .first()
      .cache(60);
  }
}
