import ContextType from 'src/graphql/ContextType';

async function bannerList(_, {}, ctx: ContextType) {
  const knex = ctx.knex.default;

  const items = await knex.table('banners');

  return items;
}

async function banner(_, { id }, ctx: ContextType) {
  const knex = ctx.knex.default;
  const item = await knex
    .table('banners')
    .where({ id })
    .first();
  return item;
}

async function updateBanner(_, { id, data }, ctx: ContextType) {
  const knex = ctx.knex.default;

  await knex
    .table('banners')
    .where({ id })
    .update(data);

  return true;
}

export const BannerResolver = {
  Query: {
    bannerList,
    banner,
  },
  Mutation: {
    updateBanner,
  },
};
