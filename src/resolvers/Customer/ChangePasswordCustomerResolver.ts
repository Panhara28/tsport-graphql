import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';

export async function ChangePasswordCustomerResolver(_, { oldPassword, newPassword }, ctx: ContextType) {
  const knex = ctx.knex.default;
  const customer = ctx.authCustomer;

  const query = knex.table('customers');

  if (customer) {
    query.where({ id: customer.id, password: md5(oldPassword) });
  }

  const update = await query.clone().update({ password: md5(newPassword) });

  return true;
}
