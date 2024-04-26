/**
 * Content.js
 * @description :: sequelize model of database table Content
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Content = sequelize.define('Content',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  title:{ type:DataTypes.STRING },
  content:{ type:DataTypes.STRING },
  translate:{ type:DataTypes.STRING },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (Content,options){
        Content.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Content,options){
        if (Content !== undefined && Content.length) { 
          for (let index = 0; index < Content.length; index++) { 
        
            const element = Content[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Content.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Content);
sequelizePaginate.paginate(Content);
module.exports = Content;
