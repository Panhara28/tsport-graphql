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
      fullname_en: input?.fullname_en,
      contact_village: input.contact_village ? input.contact_village : undefined,
      contact_district: input.contact_district ? input.contact_district : undefined,
      contact_commune: input.contact_commune ? input.contact_commune : undefined,
      contact_city_or_province: input.contact_city_or_province ? input.contact_city_or_province : undefined,
      nationality: input?.nationality,
      homeNo: input?.homeNo,
      streetNo: input?.streetNo,
      phoneNumber: input?.phoneNumber,
      dob: input.dob,
      email: input?.email,
    })
    .where({ id });

  return updateUser > 0;
};
