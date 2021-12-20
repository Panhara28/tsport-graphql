"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserMutation = void 0;

const UpdateUserMutation = async (_, {
  id,
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  const updateUser = await knex.table('users').update({
    username: input.username,
    password: input.password,
    fullname: input.fullname,
    website_id: input.website_id
  });
  return updateUser > 0;
};

exports.UpdateUserMutation = UpdateUserMutation;