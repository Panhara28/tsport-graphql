import ContextType from 'src/graphql/ContextType';

export const RoleListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const roles = await knex.table('roles');

  return {
    data: roles.map((x, idx) => {
      return {
        ...x,
      };
    }),
  };
};
