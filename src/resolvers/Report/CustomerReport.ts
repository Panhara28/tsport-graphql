import ContextType from 'src/graphql/ContextType';

export async function CustomerReport(_, { start, end, offset, limit }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const query = knex.table('customers').innerJoin('order_items', 'order_items.customer', 'customers.id');

  if (start && end) {
    query.where('order_items.created_at', [start, end]);
  }

  const items = await query
    .clone()
    .select(
      'customers.*',
      knex.raw('sum(if(order_items.status = 4, order_items.total, 0)) as order_complete'),
      knex.raw('sum(if(order_items.status = 5, order_items.total, 0)) as order_return'),
      knex.raw('sum(if(order_items.status = 4, order_items.qty, 0)) as unit_complete'),
      knex.raw('sum(if(order_items.status = 5, order_items.qty, 0)) as unit_return'),
    )
    .groupBy('customers.id')
    .offset(offset)
    .limit(limit)
    .orderBy('order_complete', 'desc');

  return items;
}
