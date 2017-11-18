// tslint:disable
import * as Sequelize from 'sequelize';


// table: cms_socialmedia
export interface cms_socialmediaAttribute {
  id:number;
  website:string;
  instagram:string;
  twitter:string;
}
export interface cms_socialmediaInstance extends Sequelize.Instance<cms_socialmediaAttribute>, cms_socialmediaAttribute { }
export interface cms_socialmediaModel extends Sequelize.Model<cms_socialmediaInstance, cms_socialmediaAttribute> { }

// table: cms_section
export interface cms_sectionAttribute {
  id:number;
  name:string;
}
export interface cms_sectionInstance extends Sequelize.Instance<cms_sectionAttribute>, cms_sectionAttribute { }
export interface cms_sectionModel extends Sequelize.Model<cms_sectionInstance, cms_sectionAttribute> { }

// table: cms_profile
export interface cms_profileAttribute {
  userid?:number;
  description_text:string;
  socialmedia_id:number;
}
export interface cms_profileInstance extends Sequelize.Instance<cms_profileAttribute>, cms_profileAttribute { }
export interface cms_profileModel extends Sequelize.Model<cms_profileInstance, cms_profileAttribute> { }

// table: cms_text_change
export interface cms_text_changeAttribute {
  id:number;
  user_id:number;
  text_id:number;
  diff:string;
  time:Date;
}
export interface cms_text_changeInstance extends Sequelize.Instance<cms_text_changeAttribute>, cms_text_changeAttribute { }
export interface cms_text_changeModel extends Sequelize.Model<cms_text_changeInstance, cms_text_changeAttribute> { }

// table: cms_text
export interface cms_textAttribute {
  id:number;
  content:string;
  section_id:number;
  creation_time:Date;
}
export interface cms_textInstance extends Sequelize.Instance<cms_textAttribute>, cms_textAttribute { }
export interface cms_textModel extends Sequelize.Model<cms_textInstance, cms_textAttribute> { }

// table: donations
export interface donationsAttribute {
  id:number;
  name:string;
  userid:number;
  timestamp:Date;
  domain:string;
  amount:string;
  visibility:number;
  text?:string;
}
export interface donationsInstance extends Sequelize.Instance<donationsAttribute>, donationsAttribute { }
export interface donationsModel extends Sequelize.Model<donationsInstance, donationsAttribute> { }

// table: levels
export interface levelsAttribute {
  userid:number;
  xp:number;
  chests:number;
  coins:number;
}
export interface levelsInstance extends Sequelize.Instance<levelsAttribute>, levelsAttribute { }
export interface levelsModel extends Sequelize.Model<levelsInstance, levelsAttribute> { }

// table: rank
export interface rankAttribute {
  id:number;
  name:string;
  color?:number;
}
export interface rankInstance extends Sequelize.Instance<rankAttribute>, rankAttribute { }
export interface rankModel extends Sequelize.Model<rankInstance, rankAttribute> { }

// table: topdesign_likes
export interface topdesign_likesAttribute {
  id:number;
  userid:number;
  postid:number;
  timestamp:Date;
}
export interface topdesign_likesInstance extends Sequelize.Instance<topdesign_likesAttribute>, topdesign_likesAttribute { }
export interface topdesign_likesModel extends Sequelize.Model<topdesign_likesInstance, topdesign_likesAttribute> { }

// table: topdesign
export interface topdesignAttribute {
  id:number;
  userid:number;
  content:string;
  image:string;
  active:number;
  theme_id:number;
}
export interface topdesignInstance extends Sequelize.Instance<topdesignAttribute>, topdesignAttribute { }
export interface topdesignModel extends Sequelize.Model<topdesignInstance, topdesignAttribute> { }

// table: topdesign_theme
export interface topdesign_themeAttribute {
  id:number;
  title:string;
  description:string;
}
export interface topdesign_themeInstance extends Sequelize.Instance<topdesign_themeAttribute>, topdesign_themeAttribute { }
export interface topdesign_themeModel extends Sequelize.Model<topdesign_themeInstance, topdesign_themeAttribute> { }

// table: user
export interface userAttribute {
  id:number;
  username:string;
  discriminator:number;
  avatar:string;
  rank_id:number;
}
export interface userInstance extends Sequelize.Instance<userAttribute>, userAttribute { }
export interface userModel extends Sequelize.Model<userInstance, userAttribute> { }
