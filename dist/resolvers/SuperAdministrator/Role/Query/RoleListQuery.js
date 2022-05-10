"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleListQuery = void 0;

const RoleListQuery = async (_, {
  websiteId
}, ctx) => {
  const knex = await ctx.knex.default;
  const roles = await knex.table('websites').innerJoin('roles', 'websites.id', 'roles.website_id').select('roles.id', 'roles.name as name').where('websites.id', '=', websiteId);
  return {
    data: roles.map((x, idx) => {
      return { ...x
      };
    })
  };
};

exports.RoleListQuery = RoleListQuery;