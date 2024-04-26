/**
 * ContactValidation.js
 * @description :: validate each post and put request as per Contact model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Contact */
exports.schemaKeys = joi.object({
  Title: joi.string().allow(null).allow(''),
  Content: joi.string().allow(null).allow(''),
  UserInfo: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of Contact for updation */
exports.updateSchemaKeys = joi.object({
  Title: joi.string().allow(null).allow(''),
  Content: joi.string().allow(null).allow(''),
  UserInfo: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Contact for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      Title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      Content: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      UserInfo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
