import { table_products, table_product_category, table_product_stock } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function ProductByIdResolver(_: any, { id }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const item = await knex
    .table<table_products>('products')
    .where({ id })
    .first();
  const sku = await knex.table<table_product_stock>('product_sku').where({ product_id: item.id });
  const category = await knex.table<table_product_category>('product_category').where({ id: item.category });

  return {
    ...item,
    sku,
    category: item.category === 0 ? null : category,
  };
}
