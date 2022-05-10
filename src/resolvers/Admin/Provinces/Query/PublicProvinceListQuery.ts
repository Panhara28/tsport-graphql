import { Graph } from "../../../generated/graph";
import ContextType from "../../../graphql/ContextType";

export const PublicProvinceListQuery = async (_, {}: Graph.PublicProvince, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  const provinceList = await knex.table("provinces");

  return provinceList.map((province) => {
    return {
      id: province.id,
      name: province.name
    }
  });
}