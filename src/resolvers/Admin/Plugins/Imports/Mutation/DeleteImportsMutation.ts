import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const DeleteImportsMutation = async (_: any, { importId }: { importId: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  await knex
    .table('imports')
    .where('id', '=', importId)
    .del();
  await knex
    .table('imports_detail')
    .where('imports_id', '=', importId)
    .del();

  return true;
};
