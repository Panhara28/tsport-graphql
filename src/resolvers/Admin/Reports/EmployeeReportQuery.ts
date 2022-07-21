import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const EmployeeReportQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.EmployeeReportFilter },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;

  const query = knex.table('hr_employees');
  const total_employee = knex.table('hr_employees');

  if (pagination.size != undefined && pagination.page != undefined) {
    query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
  }

  if (filter?.all !== 'ALL') {
    if (filter?.all != undefined) {
      query.andWhere({ status: 1 });
      total_employee.andWhere({ status: 1 });
    }
  }

  if (filter?.generalDepartmentId) {
    query.andWhere({ general_department_id: filter?.generalDepartmentId });
    total_employee.andWhere({ general_department_id: filter?.generalDepartmentId });
  }

  if (filter?.departmentId) {
    query.andWhere({ department_id: filter?.departmentId });
    total_employee.andWhere({ department_id: filter?.departmentId });
  }

  if (filter?.officeId) {
    query.andWhere({ office_id: filter?.officeId });
    total_employee.andWhere({ office_id: filter?.officeId });
  }

  if (filter?.officerName) {
    query.andWhere('fullname', 'like', `%${filter?.officerName}%`);
    total_employee.andWhere('fullname', 'like', `%${filter?.officerName}%`);
  }

  const officers = await query;

  const total: any = await total_employee?.count('id as CNT');

  return {
    data: officers.map(item => {
      return {
        ...item,
      };
    }),

    pagination: {
      total: total[0]?.CNT,
      size: officers.length,
      current: pagination.page,
    },
  };
};
