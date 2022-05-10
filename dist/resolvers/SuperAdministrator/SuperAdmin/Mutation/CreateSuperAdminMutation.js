"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSuperAdminMutation = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CreateSuperAdminMutation = async (_, {
  input
}, ctx) => {
  const knex = await ctx.knex.default;

  const hash = _bcryptjs.default.hashSync(input.password, 12);

  const createUser = await knex.table('super_admin').insert({
    username: input.username,
    password: hash,
    fullname: input.fullname
  });
  return createUser[0];
};

exports.CreateSuperAdminMutation = CreateSuperAdminMutation;