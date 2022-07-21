import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const HrEmployeeListQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.HrEmployeeFilter },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const query = knex.table('hr_employees');

  if (filter?.officerName) {
    query.andWhere('fullname', 'like', `%${filter?.officerName}%`);
  }

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  const hrEmployeeList = await query;
  const totalEmployee: any = await knex.table('hr_employees').count('id as CNT');

  return {
    data: hrEmployeeList,
    pagination: {
      current: pagination?.page,
      total: totalEmployee[0]?.CNT,
      size: hrEmployeeList?.length,
    },
  };
};
