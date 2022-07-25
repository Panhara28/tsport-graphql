import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const RemoveHrDepartmentMutation = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;

  const removeHrDepartment = await knex
    .table('hr_departments')
    .where({ id })
    .delete();

  if (removeHrDepartment) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'HR_DEPARTMENT',
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }','activityType': 'remove_hr_department', 'hr_department_id': '${id}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return true;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
