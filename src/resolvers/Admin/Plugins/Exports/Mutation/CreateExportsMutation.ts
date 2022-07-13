import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateExportsMutation = async (_: any, { input }: { input: Graph.ExportsInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createExports = await knex.table('exports').insert({
    name: input?.name,
    website_id: input?.websiteId,
  });

  if (createExports[0] > 0) {
    try {
      await knex.transaction(async (trx: any) => {
        let inputData = input?.data?.map(x => {
          return {
            year: x?.year,
            month: x?.month,
            destination_country: x?.destination_country,
            hs_code: x?.hs_code,
            net_weight_kgm: x?.net_weight_kgm,
            supplementary_unit: x?.supplementary_unit,
            quantity: x?.quantity,
            custom_value_khr: x?.custom_value_khr,
            custom_value_usd: x?.custom_value_usd,
            type: 'export',
            exports_id: createExports[0],
            hs2_code: x?.hs_code?.substr(0, 2),
            hs4_code: x?.hs_code?.substr(0, 4),
            hs6_code: x?.hs_code?.substr(0, 6),
          };
        });

        await trx('exports_detail').insert(inputData);
      });
    } catch (err) {
      console.error(err);
    }

    return createExports[0];
  }
};
