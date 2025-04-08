export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '3d',
  SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD || 'password',
  requestLimit: parseInt(process.env.REQUEST_LIMIT || '10'),
  requestLimitTime: parseInt(process.env.REQUEST_TIME || '60000'),
};
