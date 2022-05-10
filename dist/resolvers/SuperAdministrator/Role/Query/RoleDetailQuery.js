"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDetailQuery = void 0;

const RoleDetailQuery = async (_, {
  websiteId,
  roleId
}, ctx) => {
  const knex = ctx.knex.default;
  const roleDetail = await knex.table('roles').where('website_id', '=', websiteId).andWhere('id', '=', roleId).first();
  return { ...roleDetail,
    access: {
      read: roleDetail.read,
      create: roleDetail.write,
      edit: roleDetail.modified
    }
  };
};

exports.RoleDetailQuery = RoleDetailQuery;