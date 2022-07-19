import ContextType from 'src/graphql/ContextType';

export const RoleManageAccessMutation = async (
  _,
  {
    roleId,
    read,
    write,
    modify,
    remove,
  }: { roleId: number; read: boolean; write: boolean; modify: boolean; remove: boolean },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');

  const assignRoleToUser = await knex
    .table('roles')
    .update({
      read,
      write,
      modify,
      delete: remove,
    })
    .where({ id: roleId });

  return assignRoleToUser > 0;
};
