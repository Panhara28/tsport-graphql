import ContextType from 'src/graphql/ContextType';
import md5 from 'md5';

export async function ChangePasswordCustomerAdminResolver(_, { id, password, username }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const customer = await knex
    .table('customers')
    .where({ id })
    .first();

  if (customer) {
    const query = knex.table('customers');

    if (username) {
      query.update({ username });
    }

    if (password) {
      query.update({ password: md5(password) });
    }

    query.clone().where({ id });
    return true;
  }

  return false;
}
