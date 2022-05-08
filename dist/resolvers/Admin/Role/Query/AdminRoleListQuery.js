"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminRoleListQuery = void 0;

const AdminRoleListQuery = async (_, {
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const adminRoleList = await knex.table('websites').innerJoin('roles', 'websites.id', 'roles.website_id').select('roles.id', 'roles.name as name').where('websites.id', '=', websiteId);
  return {
    data: adminRoleList.map(item => {
      return { ...item
      };
    })
  };
};

exports.AdminRoleListQuery = AdminRoleListQuery;