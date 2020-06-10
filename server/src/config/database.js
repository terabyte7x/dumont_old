require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  storage: './__tests__/db_test.sqlite',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    logging: false,
  },
};
