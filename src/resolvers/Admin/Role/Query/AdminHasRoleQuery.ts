import ContextType from 'src/graphql/ContextType';

export const AdminHasRoleQuery = async (_, { userId }: { userId: number }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');

  const hasRole = await knex
    .table('users')
    .innerJoin('role_permissions', 'role_permissions.user_id', 'users.id')
    .innerJoin('roles', 'roles.id', 'role_permissions.role_id')
    .select('roles.id', 'roles.name as name')
    .where('users.id', '=', userId)
    .first();

  return {
    ...hasRole,
  };
};
