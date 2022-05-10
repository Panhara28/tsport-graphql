import ContextType from 'src/graphql/ContextType';

export const AdminUserListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const users = await knex.table('users');

  return {
    data: users.map(x => {
      return {
        ...x,
      };
    }),
  };
};
