"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserMutation = void 0;

const CreateUserMutation = async (_, {
  input
}, ctx) => {
  const knex = await ctx.knex.default;
  const createUser = await knex.table('users').insert({
    username: input.username,
    password: input.password,
    fullname: input.fullname,
    website_id: input.website_id
  });
  return createUser[0];
};

exports.CreateUserMutation = CreateUserMutation;