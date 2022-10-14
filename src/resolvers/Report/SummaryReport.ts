import { table_customers, table_users } from 'src/generated/tables';
import ContextType from 'src/graphql/ContextType';

export async function SummaryReport(_, { start, end }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const raw = await knex.raw(
    `
    SELECT 
        SUM(order_items.total) AS total_order,
        SUM(if(order_items.status = 4, order_items.total, 0)) AS total_sell,
        SUM(if(order_items.status = 5, order_items.total, 0)) AS total_return,
        SUM(if(order_items.status = 0, order_items.total, 0)) AS order_pending,
        SUM(if(order_items.status = 1, order_items.total, 0)) AS order_process,
        SUM(if(order_items.status = 3, order_items.total, 0)) AS order_delivered
    FROM orders
    INNER JOIN order_items
    ON orders.id = order_items.order_id
    ${start && end ? 'WHERE orders.created_at BETWEEN :start AND :end' : ''}
  `,
    { start, end },
  );

  const customers: table_customers[] = await knex.table('customers');
  const users: table_users[] = await knex.table('users');
  const { total } = await knex
    .table('products')
    .count('* as total')
    .first<{ total: number }>();

  return {
    ...raw[0][0],
    customers: {
      active: customers.filter(x => x.published).length,
      inactive: customers.filter(x => !x.published).length,
    },
    users: {
      active: users.filter(x => x.published).length,
      inactive: users.filter(x => !x.published).length,
    },
    products: total,
  };
}
