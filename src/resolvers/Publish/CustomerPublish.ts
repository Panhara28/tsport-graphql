import ContextType from 'src/graphql/ContextType';

export async function CustomerPublish(_, { id }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const item = await knex
    .table('customers')
    .where({ id })
    .first();

  if (item) {
    await knex
      .table('customers')
      .where({ id })
      .update({ published: !item.published });

    return true;
  }

  return false;
}
