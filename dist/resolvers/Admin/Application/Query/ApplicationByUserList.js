"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApplicationByUserList = void 0;

var _apolloServer = require("apollo-server");

const ApplicationByUserList = async (_, {}, ctx) => {
  const knex = ctx.knex.default;
  const user_id = ctx.authUser.user.id;
  const read = ctx.authUser.user.read;

  if (read) {
    const applications = await knex.table('users').innerJoin('website_user_details', 'website_user_details.user_id', 'users.id').innerJoin('websites', 'websites.id', 'website_user_details.website_id').select('websites.id', 'websites.name as name').where('users.id', '=', user_id);
    return {
      data: applications.map(item => {
        return { ...item
        };
      })
    };
  } else {
    throw new _apolloServer.AuthenticationError(`{'errorMessage':'You don't have permission', 'redirectTo':'/no-permission'}`);
  }
};

exports.ApplicationByUserList = ApplicationByUserList;