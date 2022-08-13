import { Graph } from 'src/generated/graph';
import { table_order_items } from 'src/generated/tables/table_order_items';
import ContextType from 'src/graphql/ContextType';
import { OrderService } from 'src/service/OrderService';
import { OrderStatus } from '.';

type DescriptionStatus = {
  date: string;
  status: number;
  description: string;
  note?: string;
};

export async function ChangeOrderStatusResolver(
  _,
  { status, orderItemId, note }: { note: string; status: any; orderItemId: number },
  ctx: ContextType,
) {
  const knex = ctx.knex.default;
  const order = new OrderService(knex);

  const item: table_order_items = await knex
    .table('order_items')
    .where({ id: orderItemId })
    .first();

  if (item) {
    switch (status) {
      case OrderStatus.ORDER_RECEIVED:
        await order.changeOrderToOrderRecived(orderItemId);
        break;
      case OrderStatus.ORDER_PROCESSING:
        await order.changeOrderToOrderProcessing(orderItemId);
        break;
      case OrderStatus.READY_TO_DELIVERY:
        await order.changeOrderToReadyToDelivery(orderItemId);
        break;
      case OrderStatus.ORDER_DELIVERY:
        await order.changeOrderToOrderDelivery(orderItemId);
        break;
      case OrderStatus.CONFIRM_PICK_UP:
        await order.changeOrderToPickUp(orderItemId);
        break;
      case OrderStatus.RETURN:
        await order.changeOrderToReturn(orderItemId, note);
        break;
    }
  }

  return true;
}
