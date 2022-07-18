import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateHrDepartmentMutation = async (
  _,
  { input }: { input: Graph.HrDepartmentInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const [createHRDepartment] = await knex.table('hr_departments').insert({
    name: input.name,
    parent_id: input.parent_id,
  });

  return createHRDepartment;
};
