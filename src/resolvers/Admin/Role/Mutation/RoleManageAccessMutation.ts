import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

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
  const admin_id = await ctx.authUser.user.id;

  const assignRoleToUser = await knex
    .table('roles')
    .update({
      read,
      write,
      modify,
      delete: remove,
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
