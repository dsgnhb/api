/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {levelsInstance, levelsAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<levelsInstance, levelsAttribute>('levels', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    xp: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    chests: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    coins: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'levels'
  });
};
