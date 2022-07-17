import ContextType from 'src/graphql/ContextType';

export const HrEmployeeDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const hrEmployee = await knex
    .table('hr_employees')
    .where({ id })
    .first();

  return hrEmployee;
};
