/* eslint-disable no-param-reassign */
/**
 * Model Usuario
 * @description Só deve existir um cadastro por usuário no sistema.
 * @property {integer} codigo_anac - UNIQUE no Banco de Dados
 * @property {string} email - UNIQUE no Banco de Dados
 * @param bcrypt Usuário Comum = Salt 8 // Usuário Admin = Salt 15
 */

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        usuario_ativo: Sequelize.BOOLEAN,
        admin: Sequelize.BOOLEAN,
        nome: Sequelize.STRING,
        codigo_anac: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        hash_senha: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    //--------------------------------------------------------------
    // Cria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    Usuario.beforeCreate(async (usuario) => {
      if (usuario.senha) {
        if (usuario.admin) {
          usuario.hash_senha = await bcrypt.hash(usuario.senha, 15);
        }
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
      }
      return this;
    });
    //--------------------------------------------------------------
    // Recria uma hash de salt 8 ou 15 para o usuário;
    //--------------------------------------------------------------
    Usuario.beforeUpdate(async (usuario) => {
      if (usuario.senha) {
        if (usuario.admin) {
          usuario.hash_senha = await bcrypt.hash(usuario.senha, 15);
        }
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 8);
      }
      return this;
    });
  }

  //--------------------------------------------------------------
  // Confere se a senha corresponde ao Hash
  //--------------------------------------------------------------
  checkSenha(senha) {
    return bcrypt.compare(senha, this.hash_senha);
  }
}

export default Usuario;
