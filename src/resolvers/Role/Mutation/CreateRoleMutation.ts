import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateRoleMutation = async (
  _,
  { input, permission }: { input: Graph.RoleInput; permission: Graph.RolePermissionInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const admin_id = await ctx.users.admin.id;

  const createRole = await knex.table('roles').insert({
    name: input.name,
    website_id: input.website_id,
  });

  const createRolePermission = await knex.table('role_permissions').insert({
    user_id: admin_id,
    role_id: createRole[0],
    website_id: input.website_id,
    isCreated: permission.isCreated,
    isDetail: permission.isDetail,
    isModified: permission.isModified,
    isRemove: permission.isRemove,
    isList: permission.isList,
  });

  return createRolePermission[0];
};
