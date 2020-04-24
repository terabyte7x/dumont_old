/**
 * @param underscored = Define que o banco não deverá criar as tabelas em
 *                      CamelCase, mas sim com underscore.
 *                      ex.:(UserGroups => user_groups)
 */

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'duquedotdev',
  database: 'dumont',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
