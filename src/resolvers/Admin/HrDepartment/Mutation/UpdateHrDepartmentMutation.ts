import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const UpdateHrDepartmentMutation = async (
  _,
  { id, input }: { id: number; input: Graph.HrDepartmentInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const updateHrDepartment = await knex
    .table('hr_departments')
    .update({
      name: input?.name,
      parent_id: input?.parent_id,
    })
    .where({ id });

  return updateHrDepartment > 0;
};
