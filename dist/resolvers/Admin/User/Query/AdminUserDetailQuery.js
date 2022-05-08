"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminUserDetailQuery = void 0;

const AdminUserDetailQuery = async (_, {
  id
}, ctx) => {
  const knex = await ctx.knex.default;
  const user = await knex.table('users').where({
    id
  }).first();
  return { ...user
  };
};

exports.AdminUserDetailQuery = AdminUserDetailQuery;