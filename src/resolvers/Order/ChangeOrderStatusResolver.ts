import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

type DescriptionStatus = {
  date: string;
  status: number;
  description: string;
  note?: string;
};

export async function ChangeOrderStatusResolver(
  _,
  { status, orderItemId, note }: { note: string; status: Graph.OrderStatus; orderItemId: number },
  ctx: ContextType,
) {
  const knex = ctx.knex.default;

  const orderItem = await knex
    .table('order_items')
    .where({ id: orderItemId })
    .first();

  if (orderItem) {
    const descripition: DescriptionStatus[] = JSON.parse(orderItem.description_status);
    const query = knex.table('order_items');

    // switch (status) {
    //   case 'PREPARE':
    //     query.whereNot({ status: 0 }).update({ status: 0 });
    //     descripition.push({
    //       date: new Date() + '',
    //       status: 0,
    //       description: `In prepare product.`,
    //     });
    //   case 'DELIVERY':
    //     query.whereNot({ status: 1 }).update({ status: 1 });
    //     descripition.push({
    //       date: new Date() + '',
    //       status: 1,
    //       description: `Product are delivery.`,
    //     });
    //   case 'PICKUP':
    //     query.whereNot({ status: 2 }).update({ status: 2 });
    //     descripition.push({
    //       date: new Date() + '',
    //       status: 2,
    //       description: `Product are pick up.`,
    //     });
    //   case 'RETURNED':
    //     query.whereNot({ status: 3 }).update({ status: 3 });
    //     descripition.push({
    //       date: new Date() + '',
    //       status: 3,
    //       description: `Product are return.`,
    //       note,
    //     });
    // }

    await query.clone().where({ id: orderItemId });
  }

  return true;
}
