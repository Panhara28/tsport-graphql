import { AuthenticationError } from 'apollo-server';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';

export const RemoveHrEmployeeMutation = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const admin_id = await ctx.authUser.user.id;

  const removeHrEmployee = await knex
    .table('hr_employees')
    .where({ id })
    .delete();

  if (removeHrEmployee) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'HR_EMPLOYEE',
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }','activityType': 'remove_hr_employee', 'hr_employee_id': '${id}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });

    return true;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
