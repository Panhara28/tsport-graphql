import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';

export const AdminUpdateUserMutation = async (
  _,
  { id, input }: { id: number; input: Graph.UserInput },
  ctx: ContextType,
) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');

  const updateUser = await knex('users')
    .update({
      fullname: input?.fullname ? input?.fullname : undefined,
      username: input?.username ? input?.username : undefined,
      password: input?.password ? input?.password : undefined,
      contact_village: input.contact_village ? input.contact_village : undefined,
      contact_district: input.contact_district ? input.contact_district : undefined,
      contact_kanh: input.contact_kanh ? input.contact_kanh : undefined,
      contact_city_or_province: input.contact_city_or_province ? input.contact_city_or_province : undefined,
      district: input.district ? input.district : undefined,
      commune: input.commune ? input.commune : undefined,
      province_id: input.province_id ? input.province_id : undefined,
      village_or_group: input.village_or_group ? input.village_or_group : undefined,
    })
    .where({ id });

  return updateUser > 0;
};
