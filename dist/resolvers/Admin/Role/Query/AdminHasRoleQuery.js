"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdminHasRoleQuery = void 0;

const AdminHasRoleQuery = async (_, {
  userId,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const hasRole = await knex.table('users').innerJoin('role_permissions', 'role_permissions.user_id', 'users.id').innerJoin('roles', 'roles.id', 'role_permissions.role_id').select('roles.id', 'roles.name as name').where('users.id', '=', userId).andWhere('role_permissions.website_id', '=', websiteId).first();
  return { ...hasRole
  };
};

exports.AdminHasRoleQuery = AdminHasRoleQuery;