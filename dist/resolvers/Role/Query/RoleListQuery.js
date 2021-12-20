"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleListQuery = void 0;

const RoleListQuery = async (_, {}, ctx) => {
  const knex = await ctx.knex.default;
  const roles = await knex.table('roles');
  const role_permissions = await knex.table('role_permissions');
  return roles.map((x, idx) => {
    return {
      data: { ...x
      },
      permission: { ...role_permissions[idx]
      }
    };
  });
};

exports.RoleListQuery = RoleListQuery;