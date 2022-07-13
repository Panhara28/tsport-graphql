import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const CreateImportsMutation = async (_: any, { input }: { input: Graph.ImportsInput }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const createImports = await knex.table('imports').insert({
    name: input?.name,
    website_id: input?.websiteId,
  });

  if (createImports[0] > 0) {
    try {
      await knex.transaction(async (trx: any) => {
        let inputData = input?.data?.map(x => {
          return {
            year: x?.year,
            month: x?.month,
            origin_country: x?.origin_country,
            hs_code: x?.hs_code,
            net_weight_kgm: x?.net_weight_kgm,
            supplementary_unit: x?.supplementary_unit,
            quantity: x?.quantity,
            custom_value_khr: x?.custom_value_khr,
            custom_value_usd: x?.custom_value_usd,
            type: 'import',
            imports_id: createImports[0],
            hs2_code: x?.hs_code?.substr(0, 2),
            hs4_code: x?.hs_code?.substr(0, 4),
            hs6_code: x?.hs_code?.substr(0, 6),
          };
        });

        await trx('imports_detail').insert(inputData);
      });
    } catch (err) {
      console.error(err);
    }

    return createImports[0];
  }
};
