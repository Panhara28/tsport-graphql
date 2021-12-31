import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateRoleMutation = async (
  _,
  { id, input, permission }: { id: number; input: Graph.RoleInput; permission: Graph.RolePermissionInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  await ctx.auth.requireLogin();

  const admin_id = await ctx.auth.admin.id;

  const updateRole = await knex
    .table('roles')
    .update({
      name: input.name,
      website_id: input.website_id,
    })
    .where({ id });

  const updateRolePermission = await knex
    .table('role_permissions')
    .update({
      user_id: admin_id,
      role_id: id,
      website_id: input.website_id,
      isCreated: permission.isCreated,
      isDetail: permission.isDetail,
      isModified: permission.isModified,
      isRemove: permission.isRemove,
      isList: permission.isList,
    })
    .where({ id });

  return updateRolePermission > 0;
};
