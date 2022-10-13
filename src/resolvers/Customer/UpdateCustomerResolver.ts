import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';
import { table_customers } from 'src/generated/tables';

export async function UpdateCustomerResolver(_: any, { id, data }: any, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;
  const user = ctx.authCustomer;

  const customer: table_customers = await knex
    .table('customers')
    .where({ id })
    .first();

  if (!customer) return false;

  const query = knex.table('customers');

  if (user) {
    query.where({ id: user.id });
  } else {
    query.where({ id });
  }

  const customers = await query.clone().update({
    display: data.fullname ? data.fullname : customer.display,
    phone: data.phone ? data.phone : customer.phone,
    type: data.type ? data.type : customer.type,
    address: data.address ? data.address : customer.address,
    discount: data.discount ? data.discount : customer.discount,
    profile: data.profile ? data.profile : customer.profile,
    username: data.username ? data.username : customer.username,
    password: data.password
      ? data.password === customer.password
        ? data.password
        : md5(data.password)
      : customer.password,
  });

  return customers ? true : false;
}
