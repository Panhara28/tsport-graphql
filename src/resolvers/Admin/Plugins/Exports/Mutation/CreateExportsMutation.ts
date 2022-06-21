import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateExportsMutation = async (_: any, { input }: { input: Graph.ExportsInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createExports = await knex.table('exports').insert({
    name: input?.name,
    referenceFile: input?.referenceFile,
  });

  return createExports[0];
};
