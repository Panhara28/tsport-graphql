import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';

export async function UpdateCustomerResolver(_: any, { id, data }: any, ctx: ContextType): Promise<boolean> {
  const knex = ctx.knex.default;
  const user = ctx.authCustomer;

  const customer = await knex
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
    display: data.fullname,
    phone: data.phone,
    type: data.type,
    address: data.address,
    discount: data.discount,
    profile: data.profile,
    username: data.username ? data.username : customer.username,
    password: data.password
      ? data.password === customer.password
        ? data.password
        : md5(data.password)
      : customer.password,
  });

  return customers ? true : false;
}
