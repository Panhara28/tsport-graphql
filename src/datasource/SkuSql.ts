import { SQLDataSource } from 'datasource-sql';
import Knex from 'knex';

export class SkuSql extends SQLDataSource {
  knex: Knex;

  constructor(config: any) {
    super(config);
    this.knex = Knex(config);
  }

  async getSku(id: number, productId?: number) {
    const query = this.knex.table('product_stock').where({ id });

    if (productId) {
      query.where({ product_id: productId });
    }

    return query
      .clone()
      .first()
      .cache(60);
  }
}
