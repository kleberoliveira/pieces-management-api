import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
  timezone: process.env.DATABASE_TZ,
}));
