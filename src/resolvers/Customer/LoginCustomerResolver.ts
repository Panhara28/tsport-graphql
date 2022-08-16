import md5 from 'md5';
import ContextType from 'src/graphql/ContextType';

export async function LoginCustomerResolver(_: any, { input }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const customer = await knex
    .table('customers')
    .where({ username: input.email, password: md5(input.password) })
    .first();

  if (customer) {
    return {
      token: customer.login_token,
      permissions: ['super_admin', 'store_owner', 'customer'],
    };
  }
  return null;
}
