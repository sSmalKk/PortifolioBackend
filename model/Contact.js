/**
 * Contact.js
 * @description :: sequelize model of database table Contact
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Contact = sequelize.define('Contact',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  Title:{ type:DataTypes.STRING },
  Content:{ type:DataTypes.STRING },
  UserInfo:{ type:DataTypes.STRING },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (Contact,options){
        Contact.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Contact,options){
        if (Contact !== undefined && Contact.length) { 
          for (let index = 0; index < Contact.length; index++) { 
        
            const element = Contact[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Contact.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Contact);
sequelizePaginate.paginate(Contact);
module.exports = Contact;
