import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export async function OrderListResolver(
  _,
  { status, orderCode }: { status: Graph.OrderStatus[]; orderCode: any },
  ctx: ContextType,
) {
  const knex = ctx.knex.default;
  const customer = ctx.authCustomer;

  const query = knex.table('order_items');

  if (customer) {
    query.where({ customer: customer.id });
  }

  if (status) {
    query.whereIn('status', status);
    if (status[0] === 'ORDER_RECEIVED') {
      query.orderBy('order_received_date', 'asc');
    }
    if (status[0] === 'ORDER_PROCESSING') {
      query.orderBy('order_processing_date', 'desc');
    }
    if (status[0] === 'READY_TO_DELIVERY') {
      query.orderBy('ready_to_delivery_date', 'desc');
    }
    if (status[0] === 'ORDER_DELIVERY') {
      query.orderBy('order_delivery_date', 'desc');
    }
    if (status[0] === 'CONFIRM_PICK_UP') {
      query.orderBy('pick_up_date', 'desc');
    }
    if (status[0] === 'RETURN') {
      query.orderBy('return_date', 'desc');
    }
  }

  if (orderCode) {
    query.where({ order_uuid: orderCode });
  }

  const orders = await query.clone().select();

  const items = await knex.table('products').whereIn(
    'id',
    orders.map(x => x.product_id),
  );

  const skus = await knex.table('product_stock').whereIn(
    'id',
    orders.map(x => x.sku_id),
  );

  return orders.map(x => {
    return {
      ...x,
      product: items.find(f => f.id === x.product_id),
      sku: skus.find(f => f.id === x.sku_id),
    };
  });
}
