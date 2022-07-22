import ContextType from '../../../graphql/ContextType';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const ChangePasswordMutation = async (_, { password }: { password: string }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const admin_id = await ctx.authUser.user.id;

  const hash = bcrypt.hashSync(password, 12);

  const changePassword = await knex
    .table('users')
    .update({ password: hash })
    .where({ id: admin_id });

  if (changePassword > 0) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'AUTHENTICATION',
      activity: JSON.stringify(
        `{'ip':'${ctx.ip}','activityType': 'change_password', 'user_id': '${admin_id}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
      news_id: changePassword,
      website_id: changePassword,
    });

    return changePassword > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }

  return changePassword > 0;
};
