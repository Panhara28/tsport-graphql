"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserQuery = void 0;

const UserQuery = async (_, {
  id
}, ctx) => {
  const knex = await ctx.knex.default;
  const user = await knex.table('users').where({
    id
  }).first();
  return { ...user
  };
};

exports.UserQuery = UserQuery;