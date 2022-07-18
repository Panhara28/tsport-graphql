import ContextType from 'src/graphql/ContextType';

export const HrDepartmentDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const hrDepartmentDetail = await knex
    .table('hr_departments')
    .where({ id })
    .first();

  return hrDepartmentDetail;
};
