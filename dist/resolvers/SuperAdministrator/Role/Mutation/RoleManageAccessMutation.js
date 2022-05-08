"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleManageAccessMutation = void 0;

const RoleManageAccessMutation = async (_, {
  websiteId,
  roleId,
  read,
  write,
  modified
}, ctx) => {
  const knex = ctx.knex.default;
  const roleAccess = await knex.table('roles').update({
    read,
    write,
    modified
  }).where('id', '=', roleId).andWhere('website_id', '=', websiteId);
  return roleAccess > 0;
};

exports.RoleManageAccessMutation = RoleManageAccessMutation;