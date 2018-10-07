'use strict';

module.exports = () => {
  return async function loginRequired(ctx, next) {
    const jwt = ctx.get('authorization');
    if (jwt) {
      try {

        const data = ctx.service.jwt.verify(jwt);
        ctx.locals.uid = data.uid;
        await next();

      } catch (error) {

        console.log(error);

        ctx.status = 401;
        ctx.body = {
          code: 10003,
          message: 'Permission denied',
          result: {},
        };

      }

    } else {

      ctx.status = 401;
      ctx.body = {
        code: 10004,
        message: 'Token required',
        result: {},
      };

    }
  };
};
