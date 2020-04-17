/* eslint-disable no-param-reassign */
/**
 * Model Usuario
 * @description Só deve existir um cadastro por usuário no sistema.
 * @property {integer} anac - UNIQUE no Banco de Dados
 * @property {string} email - UNIQUE no Banco de Dados
 * @param bcrypt Usuário Comum = Salt 8 // Usuário Admin = Salt 15
 */

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        active_user: Sequelize.BOOLEAN,
        admin: Sequelize.BOOLEAN,
        name: Sequelize.STRING,
        anac: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    //--------------------------------------------------------------
    // Cria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    User.beforeCreate(async (user) => {
      if (user.password) {
        if (user.admin) {
          user.password_hash = await bcrypt.hash(user.password, 15);
        }
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
      return this;
    });
    //--------------------------------------------------------------
    // Recria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    User.beforeUpdate(async (user) => {
      if (user.password) {
        if (user.admin) {
          user.password_hash = await bcrypt.hash(user.password, 15);
        }
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
      return this;
    });
  }

  //--------------------------------------------------------------
  // Método que associa os arquivos de usuário a tabela arquivos
  //--------------------------------------------------------------

  static avatar_id(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id' });
  }

  static own_photo_id(models) {
    this.belongsTo(models.File, { foreignKey: 'own_photo_id' });
  }

  //--------------------------------------------------------------
  // Confere se a senha corresponde ao Hash
  //--------------------------------------------------------------
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
