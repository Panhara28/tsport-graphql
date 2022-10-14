import ContextType from 'src/graphql/ContextType';

export async function ProductReport(_, { start, end, offset, limit }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table('products').innerJoin('order_items', 'order_items.product_id', 'products.id');

  if (start && end) {
    query.whereBetween('products.created_at', [start, end]);
  }

  const items = await query
    .clone()
    .select(
      'products.*',
      knex.raw('sum(if(order_items.status = 4, order_items.total, 0)) as order_complete'),
      knex.raw('sum(if(order_items.status = 5, order_items.total, 0)) as order_return'),
      knex.raw('sum(if(order_items.status = 4, order_items.qty, 0)) as unit_complete'),
      knex.raw('sum(if(order_items.status = 5, order_items.qty, 0)) as unit_return'),
    )
    .groupBy('products.id')
    .offset(offset)
    .limit(limit)
    .orderBy('order_complete', 'desc');

  return items;
}
