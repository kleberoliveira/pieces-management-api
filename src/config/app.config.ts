import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  title: process.env.APP_TITLE,
  description: process.env.APP_DESCRIPTION,
  version: process.env.APP_VERSION,
  port: process.env.APP_PORT,
  key: process.env.APP_KEY,
}));
