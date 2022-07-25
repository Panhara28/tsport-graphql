import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const UpdateHrDepartmentMutation = async (
  _,
  { id, input }: { id: number; input: Graph.HrDepartmentInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;

  const updateHrDepartment = await knex
    .table('hr_departments')
    .update({
      name: input?.name,
      parent_id: input?.parent_id,
    })
    .where({ id });

  if (updateHrDepartment) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'HR_DEPARTMENT',
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }','activityType': 'update_hr_department', 'hr_department_id': '${updateHrDepartment}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });
    return updateHrDepartment > 0;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
