import ContextType from 'src/graphql/ContextType';

export async function UserPublish(_, { id }, ctx: ContextType) {
  const knex = ctx.knex.default;

  const item = await knex
    .table('users')
    .where({ id })
    .first();

  if (item) {
    await knex
      .table('users')
      .where({ id })
      .update({ published: !item.published });
    return true;
  }
  return true;
}
