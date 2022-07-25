import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const AdminUpdateUserMutation = async (
  _,
  { id, input }: { id: number; input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;
  await ctx.authUser.requireLogin('USER');

  const updateUser = await knex('users')
    .update({
      fullname: input?.fullname ? input?.fullname : undefined,
      phone_number: input?.phoneNumber ? input?.phoneNumber : undefined,
      email: input?.email ? input?.email : undefined,
      profile_picture: input?.profile_picture ? input?.profile_picture : undefined,
    })
    .where({ id });

  if (updateUser > 0) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'USER',
      activity: JSON.stringify(
        `{'ip':'${ctx.ip}','activityType': 'update_user', 'user_id': '${updateUser}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return updateUser > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
