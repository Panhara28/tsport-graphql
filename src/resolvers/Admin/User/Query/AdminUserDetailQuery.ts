import ContextType from 'src/graphql/ContextType';

export const AdminUserDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const user = await knex
    .table('users')
    .where({ id })
    .first();

  return {
    ...user,
    phoneNumber: user?.phone_number,
  };
};
