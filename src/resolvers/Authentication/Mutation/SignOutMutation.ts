import ContextType from '../../../graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const SignOutMutation = async (_, { token }: { token: string }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;

  const signOut = await knex
    .table('user_token')
    .where({ token })
    .del();

  if (signOut) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'AUTHENTICATION',
      activity: JSON.stringify(
        `{'ip':'${ctx.ip}','activityType': 'sign_out', 'user_id': '${admin_id}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return true;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
