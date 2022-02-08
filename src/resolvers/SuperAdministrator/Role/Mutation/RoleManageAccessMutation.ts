import ContextType from 'src/graphql/ContextType';

export const RoleManageAccessMutation = async (
  _,
  {
    websiteId,
    roleId,
    read,
    write,
    modified,
  }: { websiteId: number; roleId: number; read: boolean; write: boolean; modified: boolean },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const roleAccess = await knex
    .table('roles')
    .update({ read, write, modified })
    .where('id', '=', roleId)
    .andWhere('website_id', '=', websiteId);

  return roleAccess > 0;
};
