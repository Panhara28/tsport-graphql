import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateImportsMutation = async (_: any, { input }: { input: Graph.ImportsInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createImports = await knex.table('imports').insert({
    name: input?.name,
    referenceFile: input?.referenceFile,
  });

  return createImports[0];
};
