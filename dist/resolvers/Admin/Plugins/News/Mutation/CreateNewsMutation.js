"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNewsMutation = void 0;

var _apolloServer = require("apollo-server");

var _NewsRepositoty = _interopRequireDefault(require("../../../../../repository/NewsRepositoty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreateNewsMutation = async (_, {
  websiteId,
  input
}, ctx) => {
  const knex = ctx.knex.default;
  await ctx.authUser.requireLogin('USER');
  const isCreate = await ctx.authUser.user.write;

  if (isCreate) {
    const createNews = await new _NewsRepositoty.default(knex).insert({
      title: input.title,
      description: JSON.stringify(input.description),
      summary: input.summary,
      thumbnail: input.thumbnail,
      new_category_id: input.new_category_id,
      created_by: 1,
      website_id: websiteId
    });
    return createNews;
  } else {
    throw new _apolloServer.AuthenticationError(`You don't have permission!`);
  }
};

exports.CreateNewsMutation = CreateNewsMutation;