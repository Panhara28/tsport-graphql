import ContextType from 'src/graphql/ContextType';

export const UserListQuery = async (_, {}, ctx: ContextType) => {
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
