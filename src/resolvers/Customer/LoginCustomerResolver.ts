import md5 from 'md5';
import ContextType from 'src/graphql/ContextType';

export async function LoginCustomerResolver(_: any, { username, password }: any, ctx: ContextType) {
  const knex = ctx.knex.default;

  const customer = await knex
    .table('customers')
    .where({ username, password: md5(password) })
    .first();

  if (customer) {
    return {
      token: customer.login_token,
    };
  }
  return null;
}
