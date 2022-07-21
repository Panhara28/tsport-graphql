import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const HrEmployeeListQuery = async (
  _,
  { pagination }: { pagination: Graph.PaginationInput },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('hr_employees');

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  const hrEmployeeList = await query;

  return {
    data: hrEmployeeList,
    pagination: {
      current: pagination?.page,
      total: hrEmployeeList?.length,
      size: hrEmployeeList?.length,
    },
  };
};
