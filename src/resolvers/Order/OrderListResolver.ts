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
    query.where({ customer: customer.id }).orderBy('id', 'desc');
  }

  if (status) {
    query.whereIn('status', status);
    // if (status[0] === 'ORDER_RECEIVED') {
    //   query.orderBy('order_received_date', 'asc');
    // }
    // if (status[0] === 'ORDER_PROCESSING') {
    //   query.orderBy('order_processing_date', 'asc');
    // }
    // if (status[0] === 'READY_TO_DELIVERY') {
    //   query.orderBy('ready_to_delivery_date', 'asc');
    // }
    // if (status[0] === 'ORDER_DELIVERY') {
    //   query.orderBy('order_delivery_date', 'asc');
    // }
    // if (status[0] === 'CONFIRM_PICK_UP') {
    //   query.orderBy('pick_up_date', 'asc');
    // }
    // if (status[0] === 'RETURN') {
    //   query.orderBy('return_date', 'asc');
    // }
  }

  if (orderCode) {
    query.where({ order_uuid: orderCode });
  }

  const orders = await query
    .clone()
    .select()
    .orderBy('id', 'desc');

  const items = await knex.table('products').whereIn(
    'id',
    orders.map(x => x.product_id),
  );

  const skus = await knex.table('product_stock').whereIn(
    'id',
    orders.map(x => x.sku_id),
  );

  const customers = await knex.table('customers').whereIn(
    'id',
    orders.map(x => x.customer),
  );

  const ord = await knex.table('orders').whereIn(
    'id',
    orders.map(x => x.order_id),
  );

  return orders.map(x => {
    const od = ord.find(f => f.id === x.order_id);
    return {
      ...x,
      address: od ? od.address : '',
      product: items.find(f => f.id === x.product_id),
      sku: skus.find(f => f.id === x.sku_id),
      customer: customers.find(f => f.id === x.customer),
      fee: od.delivery_fee || 0,
      note: od.note,
    };
  });
}
