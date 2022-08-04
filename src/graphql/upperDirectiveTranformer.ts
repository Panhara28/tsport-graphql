import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { AuthenticationError } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import ContextType from './ContextType';

export function upperDirectiveTransformer(schema: any, directiveName: string) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig, params) => {
      const upperDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        let allowed = upperDirective.public === undefined ? false : upperDirective.public;

        fieldConfig.resolve = async function(source, args, context: ContextType, info) {
          const result = await resolve(source, args, context, info);

          if (upperDirective.roles) {
            for (const role of upperDirective.roles) {
              if (role === 'SUPER_ADMIN') {
                allowed = context.authUser.user && context.authUser.user.type === 'SUPER_ADMIN';
              }
              if (role === 'ADMIN') {
                allowed = context.authUser.user && context.authUser.user.type === 'ADMIN';
              }
              if (role === 'CUSTOMER') {
                allowed = !!context.authCustomer;
              }

              if (allowed) break;
            }
          }

          if (!allowed) {
            throw new AuthenticationError('You do not have permission');
          }

          return result;
        };

        return fieldConfig;
      }
    },
  });
}
