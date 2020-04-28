/**
 * @param underscored = Define que o banco não deverá criar as tabelas em
 *                      CamelCase, mas sim com underscore.
 *                      ex.:(UserGroups => user_groups)
 */

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DB,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
