import DataLoader from 'dataloader';
import ContextType from '../graphql/ContextType';

export const GeneralDepartmentLoader = (ctx: ContextType) => {
  const knex = ctx.knex.default;

  return new DataLoader(async (keys: number[]) => {
    const result = await knex.table('departments').whereIn('general_department_id', keys);

    return keys.map(key => result.filter(x => x.general_department_id === key));
  });
};
