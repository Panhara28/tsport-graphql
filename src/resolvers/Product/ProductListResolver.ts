import { table_products, table_product_category, table_product_stock } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function ProductListResolver(_: any, { offset, limit, filter }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table<table_products>('products');

  if (filter) {
    if (filter.category) {
      query.where({ category: filter.category });
    }

    if (filter.search) {
      query.whereRaw('title LIKE :search', { search: '%' + filter.search + '%' });
    }
  }

  const items = await query
    .clone()
    .select()
    .offset(offset)
    .limit(limit);

  const sku = await knex.table<table_product_stock>('product_stock').whereIn(
    'product_id',
    items.map(x => x.id),
  );
  const category = await knex.table<table_product_category>('product_category').whereIn(
    'id',
    items.map(x => x.category),
  );

  const { total } = await query
    .clone()
    .count('* as total')
    .first<{ total: number }>();

  const data = items.map(item => {
    return {
      ...item,
      sku: sku.filter(x => x.product_id === item.id),
      category: item.category === 0 ? null : category.find(x => x.id === item.category),
    };
  });

  return {
    data,
    pagination: {
      total,
      current: offset + 1,
      size: data.length,
    },
  };
}
