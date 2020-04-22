/**
 * @param underscored = Define que o banco não deverá criar as tabelas em
 *                      CamelCase, mas sim com underscore.
 *                      ex.:(UserGroups => user_groups)
 */

module.exports = {
  dialect: 'postgres',
  host: '192.168.0.238',
  username: 'postgres',
  password: 'duquedotdev',
  database: 'dumont_v2',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
