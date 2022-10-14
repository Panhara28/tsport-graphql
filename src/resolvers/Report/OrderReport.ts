import { CustomerLoader } from 'src/dataloader/CustomerLoader';
import { ProductLoader } from 'src/dataloader/ProductLoader';
import ContextType from 'src/graphql/ContextType';

export async function OrderReport(_, { start, end, offset, limit }, ctx: ContextType) {
  const knex = ctx.knex.default;
  const productLoader = ProductLoader(ctx);
  const customerLoader = CustomerLoader(ctx);

  const query = knex.table('order_items');

  if (start && end) {
    query.whereBetween('created_at', [start, end]);
  }

  const items = await query
    .clone()
    .select()
    .offset(offset)
    .limit(limit);

  return items.map(x => {
    return {
      ...x,
      product: () => productLoader.load(x.product_id),
      customer: () => customerLoader.load(x.customer),
    };
  });
}
