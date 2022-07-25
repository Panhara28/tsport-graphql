import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const AdminAssignRoleToUserMutation = async (
  _,
  { userId, roleId }: { userId: number; roleId: number },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;

  await ctx.authUser.requireLogin('USER');
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
    user_id: userId,
    role_id: roleId,
  });

  if (assignRoleToUser) {
    await knex('activity_log').insert({
      user_id: admin_id,
      type: 'ROLE',
      activity: JSON.stringify(
        `{'activityType': 'assign_role_to_user', 'role_id': '${assignRoleToUser}', 'user_id': '${userId}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return assignRoleToUser;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
