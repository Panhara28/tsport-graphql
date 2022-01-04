import ContextType from 'src/graphql/ContextType';

export const AssignRoleToUserMutation = async (
  _,
  { websiteId, userId, roleId }: { websiteId: number; userId: number; roleId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authSuperAdmin.requireLogin('SUPER_ADMIN');
  const roleUserPermission = await knex
    .table('role_permissions')
    .where('user_id', '=', userId)
    .first();
  if (roleUserPermission) {
    await knex
      .table('role_permissions')
      .del()
      .where({ id: roleUserPermission.id });
  }
  const [assignRoleToUser] = await knex.table('role_permissions').insert({
    website_id: websiteId,
    user_id: userId,
    role_id: roleId,
  });

  return assignRoleToUser;
};
