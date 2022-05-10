"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsListQuery = void 0;

var _apolloServer = require("apollo-server");

const NewsListQuery = async (_, {
  filter,
  pagination,
  websiteId
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isRead = await ctx.authUser.user.read;

  if (isRead) {
    const query = knex.table('news').orderBy('id', 'desc').where('website_id', '=', websiteId);
    const totalQuery = knex.table('news');

    if ((filter === null || filter === void 0 ? void 0 : filter.status) != undefined) {
      query.andWhere({
        status: filter.status
      });
      totalQuery.andWhere({
        status: filter.status
      });
    }

    if (filter !== null && filter !== void 0 && filter.name) {
      query.andWhere('title', 'like', `%${filter === null || filter === void 0 ? void 0 : filter.name}%`);
    }

    if (pagination.size != undefined && pagination.page != undefined) {
      query.limit(pagination.size).offset((pagination.page - 1) * pagination.size);
    }

    const data = await query;
    const total = await totalQuery.count('id as CNT');
    let newData;

    if ((filter === null || filter === void 0 ? void 0 : filter.id) !== undefined) {
      const regex = new RegExp(`^${filter.id + ''}`, 'i');
      newData = data.sort().filter(val => regex.test(val.id + ''));
    } else {
      newData = data;
    }

    return {
      data: newData.map(item => {
        return { ...item
        };
      }),
      pagination: {
        total: Number(total[0].CNT),
        size: data.length,
        current: pagination.page
      }
    };
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission!`);
  }
};

exports.NewsListQuery = NewsListQuery;