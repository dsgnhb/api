// tslint:disable
import * as path from 'path';
import * as sequelize from 'sequelize';
import * as def from './db';

export interface ITables {
  cms_socialmedia:def.cms_socialmediaModel;
  cms_section:def.cms_sectionModel;
  cms_profile:def.cms_profileModel;
  cms_text_change:def.cms_text_changeModel;
  cms_text:def.cms_textModel;
  donations:def.donationsModel;
  levels:def.levelsModel;
  rank:def.rankModel;
  topdesign_likes:def.topdesign_likesModel;
  topdesign:def.topdesignModel;
  topdesign_theme:def.topdesign_themeModel;
  user:def.userModel;
}

export const getModels = function(seq:sequelize.Sequelize):ITables {
  const tables:ITables = {
    cms_socialmedia: seq.import(path.join(__dirname, './cms_socialmedia')),
    cms_section: seq.import(path.join(__dirname, './cms_section')),
    cms_profile: seq.import(path.join(__dirname, './cms_profile')),
    cms_text_change: seq.import(path.join(__dirname, './cms_text_change')),
    cms_text: seq.import(path.join(__dirname, './cms_text')),
    donations: seq.import(path.join(__dirname, './donations')),
    levels: seq.import(path.join(__dirname, './levels')),
    rank: seq.import(path.join(__dirname, './rank')),
    topdesign_likes: seq.import(path.join(__dirname, './topdesign_likes')),
    topdesign: seq.import(path.join(__dirname, './topdesign')),
    topdesign_theme: seq.import(path.join(__dirname, './topdesign_theme')),
    user: seq.import(path.join(__dirname, './user')),
  };
  return tables;
};
