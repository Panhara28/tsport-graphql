"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaListQuery = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _mediaUserLoader = require("../../../../../dataloader/mediaUserLoader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MediaListQuery = async (_, {
  websiteId,
  pagination
}, ctx) => {
  const knex = ctx.knex.default;
  const mediaList = await knex.table('media').where('website_id', '=', websiteId).orderBy('id', 'desc');
  const mediaUser = (0, _mediaUserLoader.MediaUserLoader)(ctx);
  return {
    data: mediaList.map(item => {
      return { ...item,
        created_at: (0, _moment.default)(item.created_at).format('DD MMMM, YYYY'),
        user: mediaUser.load(item.created_by)
      };
    }),
    pagination: {
      total: mediaList.length,
      size: mediaList.length,
      current: pagination.page
    }
  };
};

exports.MediaListQuery = MediaListQuery;