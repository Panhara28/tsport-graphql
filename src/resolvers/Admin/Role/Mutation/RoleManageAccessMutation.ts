import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';
import { Graph } from 'src/generated/graph';

export const RoleManageAccessMutation = async (
  _,
  { roleId, input }: { roleId: number; input: Graph.RoleAccessInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const admin_id = await ctx.authUser.user.id;

  const assignRoleToUser = await knex
    .table('roles')
    .update({
      read: input?.read,
      write: input?.write,
      modify: input?.modify,
      delete: input?.remove,
      generalDepartmentRead: input?.generalDepartmentRead,
      generalDepartmentWrite: input?.generalDepartmentWrite,
      generalDepartmentModify: input?.generalDepartmentModify,
      generalDepartmentRemove: input?.generalDepartmentRemove,
      departmentRead: input?.departmentRead,
      departmentWrite: input?.departmentWrite,
      departmentModify: input?.departmentModify,
      departmentRemove: input?.departmentRemove,
      officeRead: input?.officeRead,
      officeWrite: input?.officeWrite,
      officeModify: input?.officeModify,
      officeRemove: input?.officeRemove,
      officerRead: input?.officerRead,
      officerWrite: input?.officerWrite,
      officerModify: input?.officerModify,
      officerRemove: input?.officerRemove,
    })
    .where({ id: roleId });

  if (assignRoleToUser) {
    await knex('activity_log').insert({
      user_id: admin_id,
      type: 'ROLE',
      activity: JSON.stringify(
        `{'activityType': 'manage_role_access', 'role_id': '${assignRoleToUser}', 'user_id': '${admin_id}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });
    return assignRoleToUser > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
