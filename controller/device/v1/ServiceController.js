/**
 * ServiceController.js
 * @description :: exports action methods for Service.
 */

const Service = require('../../../model/Service');
const ServiceSchemaKey = require('../../../utils/validation/ServiceValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Service in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Service. {status, message, data}
 */ 
const addService = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ServiceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdService = await dbService.createOne(Service,dataToCreate);
    return  res.success({ data :createdService });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Service in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Services. {status, message, data}
 */
const bulkInsertService = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdService = await dbService.createMany(Service,dataToCreate); 
      return  res.success({ data :{ count :createdService.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Service from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Service(s). {status, message, data}
 */
const findAllService = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundService;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ServiceSchemaKey.findFilterKeys,
      Service.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundService = await dbService.count(Service, query);
      if (!foundService) {
        return res.recordNotFound();
      } 
      foundService = { totalRecords: foundService };
      return res.success({ data :foundService });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundService = await dbService.paginate( Service,query,options);
    if (!foundService){
      return res.recordNotFound();
    }
    return res.success({ data:foundService }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Service from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Service. {status, message, data}
 */
const getService = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundService = await dbService.findOne(Service,{ id :id });
    if (!foundService){
      return res.recordNotFound();
    }
    return  res.success({ data :foundService });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Service.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getServiceCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ServiceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedService = await dbService.count(Service,where);
    if (!countedService){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedService } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Service with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Service.
 * @return {Object} : updated Service. {status, message, data}
 */
const updateService = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ServiceSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedService = await dbService.update(Service,query,dataToUpdate);
    return  res.success({ data :updatedService }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Service with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Services.
 * @return {Object} : updated Services. {status, message, data}
 */
const bulkUpdateService = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedService = await dbService.update(Service,filter,dataToUpdate);
    if (!updatedService){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedService.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Service with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Service.
 * @return {Object} : updated Service. {status, message, data}
 */
const partialUpdateService = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ServiceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedService = await dbService.update(Service, query, dataToUpdate);
    if (!updatedService) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedService });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Service from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Service.
 * @return {Object} : deactivated Service. {status, message, data}
 */
const softDeleteService = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Service, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Service from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Service. {status, message, data}
 */
const deleteService = async (req, res) => {
  const result = await dbService.deleteByPk(Service, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Service in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyService = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedService = await dbService.destroy(Service,query);
    return res.success({ data :{ count :deletedService.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Service from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Service.
 * @return {Object} : number of deactivated documents of Service. {status, message, data}
 */
const softDeleteManyService = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedService = await dbService.update(Service,query,updateBody, options);
    if (!updatedService) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedService.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addService,
  bulkInsertService,
  findAllService,
  getService,
  getServiceCount,
  updateService,
  bulkUpdateService,
  partialUpdateService,
  softDeleteService,
  deleteService,
  deleteManyService,
  softDeleteManyService,
};
