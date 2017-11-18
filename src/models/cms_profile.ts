/* jshint indent: 2 */
// tslint:disable
import * as sequelize from 'sequelize';
import {DataTypes} from 'sequelize';
import {cms_profileInstance, cms_profileAttribute} from './db';

module.exports = function(sequelize: sequelize.Sequelize, DataTypes: DataTypes) {
  return sequelize.define<cms_profileInstance, cms_profileAttribute>('cms_profile', {
    userid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    description_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    socialmedia_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'cms_socialmedia',
        key: 'id'
      }
    }
  }, {
    tableName: 'cms_profile'
  });
};
