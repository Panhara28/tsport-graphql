import { Graph } from 'src/generated/graph';
import ContextType from 'src/graphql/ContextType';
import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server';

export const AdminCreateUserMutation = async (_, { input }: { input: Graph.UserInput }, ctx: ContextType) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const hash = bcrypt.hashSync(input.password, 12);

  const [createUser] = await knex('users').insert({
    fullname: input?.fullname ? input?.fullname : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password ? hash : undefined,
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
    profile_picture: input?.profile_picture,
    // district: input.district ? input.district : undefined,
    // commune: input.commune ? input.commune : undefined,
    // province_id: input.province_id ? input.province_id : undefined,
    // village_or_group: input.village_or_group ? input.village_or_group : undefined,
  });

  if (createUser) {
    await knex('role_permissions').insert({
      user_id: createUser,
      role_id: 1,
    });
    await knex('user_plugins').insert({
      user_id: createUser,
      plugin_id: 1,
    });
    return createUser;
  } else {
    throw new AuthenticationError(`You can't do that!`);
  }
};
