import { table_products, table_product_category, table_product_stock } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

async function LoadCategoryId(ctx: ContextType) {
  const category = await ctx.knex.default.table('product_category');
  return category;
}

export async function ProductListResolver(_: any, { offset, limit, filter }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table<table_products>('products');

  if (filter) {
    if (filter.category) {
      const category = (await LoadCategoryId(ctx)).filter(x => {
        if (x.id === filter.category) return x;
        if (x.parent === filter.category) return x;
      });

      const categoryLast = await knex.table('product_category').whereIn(
        'parent',
        category.map(x => x.id),
      );

      query.whereIn('category', [...category.map(x => x.id), ...categoryLast.map(x => x.id)]);
    }

    if (filter.search) {
      query.whereRaw('title LIKE :search', { search: '%' + filter.search + '%' });
    }
  }

  const items = await query
    .clone()
    .select()
    .where({ published: true })
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
    .where({ published: true })
    .first<{ total: number }>();

  const data = items.map(item => {
    return {
      ...item,
      sku: sku.filter(x => x.product_id === item.id),
      category: item.category === 0 ? null : category.find(x => x.id === item.category),
      images: item.images ? item.images.split(',') : [],
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
