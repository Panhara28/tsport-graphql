import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const EmployeeReportQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.EmployeeReportFilter },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const query = knex.table('hr_employees');

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  if (filter?.all !== 'ALL') {
    if (filter?.all != undefined) {
      query.andWhere({ status: 1 });
    }
  }

  if (filter?.generalDepartmentId) {
    query.andWhere({ general_department_id: filter?.generalDepartmentId });
  }

  if (filter?.departmentId) {
    query.andWhere({ department_id: filter?.departmentId });
  }

  if (filter?.officeId) {
    query.andWhere({ office_id: filter?.officeId });
  }

  if (filter?.officerName) {
    query.andWhere('fullname', 'like', `%${filter?.officerName}%`);
  }

  const officers = await query;

  return {
    data: officers.map(item => {
      return {
        ...item,
      };
    }),

    pagination: {
      total: officers.length,
      size: officers.length,
      current: pagination.page,
    },
  };
};
