import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateCOExportsMutation = async (_, { input }: { input: Graph.COExportsInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createCOExports = await knex.table('co_exports').insert({
    name: input?.name,
    website_id: input?.websiteId,
  });

  if (createCOExports[0] > 0) {
    try {
      for (const x of input?.data) {
        await knex.table('co_exports_detail').insert({
          year: x?.year,
          month: x?.month,
          destination_country: x?.destination_country,
          hs_code: x?.hs_code,
          unit: x?.unit,
          quantity: x?.quantity,
          fob_value_usd: x?.fob_value_usd,
          form_type: x?.form_type,
          co_exports_id: createCOExports[0],
        });
      }
    } catch (err) {
      const message = {
        message: 'Upload Failed!',
        coExportId: createCOExports[0],
      };

      throw new Error(JSON.stringify(message));
    }

    return createCOExports[0];
  }
};
