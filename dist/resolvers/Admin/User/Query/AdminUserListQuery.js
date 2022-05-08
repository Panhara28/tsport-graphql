"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminUserListQuery = void 0;

const AdminUserListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  const users = await knex.table('users');
  return {
    data: users.map(x => {
      return { ...x
      };
    })
  };
};

exports.AdminUserListQuery = AdminUserListQuery;