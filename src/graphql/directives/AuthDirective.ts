/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
import ContextType from '../ContextType';
export function enforceAuthDirective(field: any, params: any) {
  const { resolve = defaultFieldResolver } = field;
  let { roles } = params;
  const { permission } = params;

  return async function(...args) {
    const ctx: ContextType = args[2];
    let allowed = params.public === undefined ? false : params.public;

    if (typeof roles === 'string') {
      roles = [roles];
    }

    if (roles) {
      for (const role of roles) {
        if (role === 'SUPER_ADMIN') {
          allowed = ctx.authUser.user && ctx.authUser.user.type === 'SUPER_ADMIN';
        } else if (role === 'ADMIN') {
          allowed = ctx.authUser.user && ctx.authUser.user.type === 'ADMIN';
        } else if (role === 'CUSTOMER') {
          allowed = !!ctx.authCustomer;
        }

        if (allowed) break;
      }
    }

    // if (permission) {
    //   if (ctx.authUser.user.type === 'SUPER_ADMIN') allowed = true;
    //   else allowed = ctx.auth.admin.permissions.indexOf(permission) >= 0;
    // }

    if (!allowed) {
      throw new AuthenticationError('You do not have permission');
    }

    return await resolve.apply(this, args);
  };
}

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any) {
    field.resolve = enforceAuthDirective(field, this.args);
  }
}
