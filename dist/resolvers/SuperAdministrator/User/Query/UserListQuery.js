"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserListQuery = void 0;

const UserListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  const users = await knex.table('users');
  return {
    data: users.map(x => {
      return { ...x
      };
    })
  };
};

exports.UserListQuery = UserListQuery;