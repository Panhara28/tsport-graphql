import ContextType from 'src/graphql/ContextType';

export async function CustomerByIdResolver(_, { id }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const customer = await knex
    .table('customers')
    .where({ id })
    .first();

  return {
    ...customer,
    fullname: customer.display,
  };
}
