import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.avatar_id && model.avatar_id(this.connection.models)
    );
    models.map(
      (model) =>
        model.own_photo_id && model.own_photo_id(this.connection.models)
    );
  }
}

export default new Database();
