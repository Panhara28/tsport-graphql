import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import moment from 'moment';
import { AuthenticationError } from 'apollo-server';

export const CreateHrDepartmentMutation = async (
  _,
  { input }: { input: Graph.HrDepartmentInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.authUser.user.id;

  const existHrDepartment = await knex
    .table('hr_departments')
    .where({ name: input?.name })
    .first();

  if (existHrDepartment) {
    throw new AuthenticationError('Already Existed!');
  }

  const [createHRDepartment] = await knex.table('hr_departments').insert({
    name: input?.name,
    parent_id: input?.parent_id,
  });

  if (createHRDepartment) {
    await knex.table('activity_log').insert({
      user_id: admin_id,
      type: 'HR_DEPARTMENT',
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }','activityType': 'create_hr_department', 'hr_department_id': '${createHRDepartment}', 'logged_at': '${moment().format(
          'DD-MM-YYYY HH:mm:ss',
        )}'}`,
      ),
    });
    return createHRDepartment;
  } else {
    throw new AuthenticationError('Something went wrong');
  }
};
