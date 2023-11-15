import ContextType from 'src/graphql/ContextType';

async function Settings(_, {}, ctx: ContextType) {
  const knex = ctx.knex.default;

  const khr = await knex
    .table('settings')
    .where({ label: 'KHR_VALUE' })
    .first();

  return {
    id: 1,
    options: {
      khrvalue: khr ? khr.value : 0,
      siteTitle: 'Tsportcambodia',
      siteSubtitle: 'Your next ecommerce',
      currency: 'USD',
      useOtp: false,
      deliveryTime: [
        {
          title: 'Express Delivery',
          description: '90 min express delivery',
        },
        {
          title: 'Morning',
          description: '8.00 AM - 11.00 AM',
        },
        {
          title: 'Noon',
          description: '11.00 AM - 2.00 PM',
        },
        {
          title: 'Afternoon',
          description: '2.00 PM - 5.00 PM',
        },
        {
          title: 'Evening',
          description: '5.00 PM - 8.00 PM',
        },
      ],
      logo: {
        id: '862',
        thumbnail: 'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/860/conversions/PickBazar-thumbnail.jpg',
        original: 'https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/860/PickBazar.png',
      },
      taxClass: '1',
      shippingClass: '1',
      contactDetails: {
        contact: '+129290122122',
        website: 'https://redq.io',
        socials: [
          {
            icon: 'FacebookIcon',
            url: 'https://www.facebook.com/',
          },
          {
            icon: 'TwitterIcon',
            url: 'https://twitter.com/home',
          },
          {
            icon: 'InstagramIcon',
            url: 'https://www.instagram.com/',
          },
        ],
        location: {
          lat: 42.9585979,
          lng: -76.90872019999999,
          city: null,
          state: 'NY',
          country: 'United States',
          zip: null,
          formattedAddress: 'NY State Thruway, New York, USA',
        },
      },
      seo: {
        metaTitle: null,
        metaDescription: null,
        ogTitle: null,
        ogDescription: null,
        ogImage: null,
        twitterHandle: null,
        twitterCardType: null,
        metaTags: null,
        canonicalUrl: null,
      },
      google: null,
      facebook: null,
    },
  };
}

async function updateKhrCurrencyValue(_, { currency }, ctx: ContextType) {
  const knex = ctx.knex.default();
  await knex
    .table('settings')
    .update({ value: currency })
    .where({ label: 'KHR_VALUE' });
  return true;
}

export const SettingResolver = {
  Query: {
    settings: Settings,
  },
  Mutation: {
    updateKhrCurrencyValue,
  },
};
