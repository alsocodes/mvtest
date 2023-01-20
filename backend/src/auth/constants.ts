import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  access_token_secret: process.env.ACCESS_TOKEN_SECRET_KEY || 'access_secreet',
  access_token_expires: process.env.ACCESS_TOKEN_EXPIRES_IN || '900000s',
};
// console.log(jwtConstants);
export const IS_PUBLIC_KEY = 'isPublic';
export const PublicRoute = () => SetMetadata(IS_PUBLIC_KEY, true);
