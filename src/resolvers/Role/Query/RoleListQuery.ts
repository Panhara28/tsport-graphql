import ContextType from 'src/graphql/ContextType';

export const RoleListQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const roles = await knex.table('roles');
  const role_permissions = await knex.table('role_permissions');

  return roles.map((x, idx) => {
    return {
      data: {
        ...x,
      },
      permission: {
        ...role_permissions[idx],
      },
    };
  });
};
