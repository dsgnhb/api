/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {cms_socialmediaInstance, cms_socialmediaAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<cms_socialmediaInstance, cms_socialmediaAttribute>('cms_socialmedia', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    instagram: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'cms_socialmedia'
  });
};
