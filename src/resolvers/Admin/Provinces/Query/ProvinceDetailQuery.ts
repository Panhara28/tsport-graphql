import { AuthenticationError } from "apollo-server";
import ContextType from "../../../graphql/ContextType"

export const ProvinceDetailQuery = async (_, { id }: { id: number }, ctx: ContextType) => {
  const knex = await ctx.knex.default;

  let isDetail = await ctx.auth.admin.isDetail

  if (!isDetail) {
    throw new AuthenticationError("You have no detail permission!")
  }

  const provinceDetail = await knex.table("provinces").where({id}).first();

  return {
    ...provinceDetail
  }
}