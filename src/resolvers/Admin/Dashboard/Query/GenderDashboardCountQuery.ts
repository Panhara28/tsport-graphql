import ContextType from 'src/graphql/ContextType';

export const GenderDashbaordCountQuery = async (_, {}, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const male_count: any = await knex
    .table('hr_employees')
    .where({ gender: 'ប្រុស' })
    .count('id as CNT');
  const female_count: any = await knex
    .table('hr_employees')
    .where({ gender: 'ស្រី' })
    .count('id as CNT');

  return {
    total_male: male_count[0]?.CNT,
    total_female: female_count[0]?.CNT,
  };
};
