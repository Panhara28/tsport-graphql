import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateProvinceMutation = async (_, { input }: { input: Graph.ProvinceInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const [createProvince] = await knex.table('provinces').insert({
    name: input.name,
    created_by: input.created_by,
    updated_by: input.updated_by,
  });

  return createProvince;
};
