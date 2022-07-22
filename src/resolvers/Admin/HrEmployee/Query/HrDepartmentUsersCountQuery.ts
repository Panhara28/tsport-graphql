import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const HrDepartmentUsersCountQuery = async (
  _,
  { pagination, filter }: { pagination: Graph.PaginationInput; filter: Graph.HrDepartmentUsersCountFilter },
  ctx: ContextType,
) => {
  const knex = await ctx.knex.default;

  const data = knex.table('hr_departments');
  const users_data = knex.table('hr_employees');
  const users_data_count = knex.table('hr_employees');
  const parent_data = knex.table('hr_departments');

  const hrDepartmentUsersCount = [];

  let hr_departments;
  let total_users;
  let total_users_count;
  let parent;

  if (filter?.parent_id) {
    hr_departments = await data.andWhere({ parent_id: filter?.parent_id });
    parent = await parent_data.andWhere({ id: filter?.parent_id }).first();

    if (filter?.officerName) {
      users_data?.andWhere('fullname', 'like', `%${filter?.officerName}%`);
      users_data_count?.andWhere('fullname', 'like', `%${filter?.officerName}%`);
    }

    if (pagination?.size != undefined && pagination?.page != undefined) {
      users_data.limit(pagination?.size).offset((pagination?.page - 1) * pagination?.size);
    }

    if (filter?.type === 'GENERAL_DEPARTMENT') {
      total_users = await users_data.where({ general_department_id: filter?.parent_id });
      total_users_count = await users_data_count.where({ general_department_id: filter?.parent_id }).count('id as CNT');
    } else if (filter?.type === 'DEPARTMENT') {
      total_users = await users_data.where({ department_id: filter?.parent_id });
      total_users_count = await users_data_count.where({ department_id: filter?.parent_id }).count('id as CNT');
    } else if (filter?.type === 'OFFICE') {
      total_users = await users_data.where({ office_id: filter?.parent_id });
      total_users_count = await users_data_count.where({ office_id: filter?.parent_id }).count('id as CNT');
    }
  } else {
    if (filter?.officerName) {
      users_data?.andWhere('fullname', 'like', `%${filter?.officerName}%`);
    }

    hr_departments = await data.andWhere({ parent_id: 0 });

    if (pagination?.size != undefined && pagination?.page != undefined) {
      users_data.limit(pagination?.size).offset((pagination?.page - 1) * pagination?.size);
    }

    total_users = await users_data;
    total_users_count = await users_data_count.count('id as CNT');
    parent = undefined;
  }

  for (const item of hr_departments) {
    const item_query: any = knex.table('hr_employees');

    let item_data;

    if (filter?.type === 'GENERAL_DEPARTMENT') {
      item_data = await item_query.where({ department_id: item?.id });
    } else if (filter?.type === 'DEPARTMENT') {
      item_data = await item_query.where({ office_id: item?.id });
    } else {
      item_data = await item_query.where({ general_department_id: item?.id });
    }

    hrDepartmentUsersCount.push({
      id: item?.id,
      name: item?.name,
      count: item_data?.length,
      users: item_data,
    });
  }

  return {
    data: hrDepartmentUsersCount,
    parent,
    totalUsers: total_users?.map((x: any) => {
      const { password, ...other } = x;

      return other;
    }),
    pagination: {
      total: total_users_count[0]?.CNT,
      current: pagination?.page,
      size: total_users?.length,
    },
  };
};
