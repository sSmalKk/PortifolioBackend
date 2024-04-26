/**
 * ContentValidation.js
 * @description :: validate each post and put request as per Content model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of Content */
exports.schemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  content: joi.string().allow(null).allow(''),
  translate: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of Content for updation */
exports.updateSchemaKeys = joi.object({
  title: joi.string().allow(null).allow(''),
  content: joi.string().allow(null).allow(''),
  translate: joi.string().allow(null).allow(''),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  createdAt: joi.date().options({ convert: true }).allow(null).allow(''),
  updatedAt: joi.date().options({ convert: true }).allow(null).allow(''),
  addedBy: joi.number().integer().allow(0),
  updatedBy: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of Content for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      title: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      content: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      translate: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      createdAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      updatedAt: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      addedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      updatedBy: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
