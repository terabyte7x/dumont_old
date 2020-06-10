/* eslint-disable no-param-reassign */
/**
 * Model Usuario
 * @description Só deve existir um cadastro por usuário no sistema.
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
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
        role: Sequelize.ENUM({
          values: [
            'student',
            'teacher',
            'manager',
            'director',
            'financial',
            'humanresources',
            'technology',
            'schedule',
            'pedagogical',
            'marketing',
            'attendance',
            'vendor',
            'flightops',
            'mechanist',
            'maintancehead',
            'instructionhead',
          ],
        }),
      },
      {
        tableName: 'users',
        sequelize,
      }
    );
    //--------------------------------------------------------------
    // Cria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    User.beforeCreate(async (user) => {
      if (!user.admin) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      } else {
        user.password_hash = await bcrypt.hash(user.password, 15);
      }
      return this;
    });
    //--------------------------------------------------------------
    // Recria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    User.beforeUpdate(async (user) => {
      if (!user.admin) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      } else {
        user.password_hash = await bcrypt.hash(user.password, 15);
      }
      return this;
    });
  }

  //--------------------------------------------------------------
  // Método que associa os arquivos de usuário a tabela arquivos
  //--------------------------------------------------------------

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar',
    });
  }

  //--------------------------------------------------------------
  // Confere se a senha corresponde ao Hash
  //--------------------------------------------------------------
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
