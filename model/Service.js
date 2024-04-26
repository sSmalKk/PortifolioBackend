/**
 * Service.js
 * @description :: sequelize model of database table Service
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Service = sequelize.define('Service',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  Name:{ type:DataTypes.STRING },
  Image:{ type:DataTypes.STRING },
  Page:{ type:DataTypes.JSON },
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
      async function (Service,options){
        Service.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (Service,options){
        if (Service !== undefined && Service.length) { 
          for (let index = 0; index < Service.length; index++) { 
        
            const element = Service[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Service.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Service);
sequelizePaginate.paginate(Service);
module.exports = Service;
