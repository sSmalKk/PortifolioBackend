/**
 * ContentController.js
 * @description :: exports action methods for Content.
 */

const Content = require('../../../model/Content');
const ContentSchemaKey = require('../../../utils/validation/ContentValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Content in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Content. {status, message, data}
 */ 
const addContent = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      ContentSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
        
    let createdContent = await dbService.createOne(Content,dataToCreate);
    return  res.success({ data :createdContent });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Content in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Contents. {status, message, data}
 */
const bulkInsertContent = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      let createdContent = await dbService.createMany(Content,dataToCreate); 
      return  res.success({ data :{ count :createdContent.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Content from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Content(s). {status, message, data}
 */
const findAllContent = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundContent;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      ContentSchemaKey.findFilterKeys,
      Content.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundContent = await dbService.count(Content, query);
      if (!foundContent) {
        return res.recordNotFound();
      } 
      foundContent = { totalRecords: foundContent };
      return res.success({ data :foundContent });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundContent = await dbService.paginate( Content,query,options);
    if (!foundContent){
      return res.recordNotFound();
    }
    return res.success({ data:foundContent }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Content from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Content. {status, message, data}
 */
const getContent = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundContent = await dbService.findOne(Content,{ id :id });
    if (!foundContent){
      return res.recordNotFound();
    }
    return  res.success({ data :foundContent });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Content.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getContentCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      ContentSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedContent = await dbService.count(Content,where);
    if (!countedContent){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedContent } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Content with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Content.
 * @return {Object} : updated Content. {status, message, data}
 */
const updateContent = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ContentSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedContent = await dbService.update(Content,query,dataToUpdate);
    return  res.success({ data :updatedContent }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Content with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Contents.
 * @return {Object} : updated Contents. {status, message, data}
 */
const bulkUpdateContent = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {};
    }
    let updatedContent = await dbService.update(Content,filter,dataToUpdate);
    if (!updatedContent){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedContent.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Content with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Content.
 * @return {Object} : updated Content. {status, message, data}
 */
const partialUpdateContent = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      ContentSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedContent = await dbService.update(Content, query, dataToUpdate);
    if (!updatedContent) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedContent });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Content from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Content.
 * @return {Object} : deactivated Content. {status, message, data}
 */
const softDeleteContent = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = { isDeleted: true, };
    let result = await dbService.update(Content, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Content from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Content. {status, message, data}
 */
const deleteContent = async (req, res) => {
  const result = await dbService.deleteByPk(Content, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Content in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyContent = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedContent = await dbService.destroy(Content,query);
    return res.success({ data :{ count :deletedContent.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Content from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Content.
 * @return {Object} : number of deactivated documents of Content. {status, message, data}
 */
const softDeleteManyContent = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = { isDeleted: true, };
    const options = {};
    let updatedContent = await dbService.update(Content,query,updateBody, options);
    if (!updatedContent) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedContent.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addContent,
  bulkInsertContent,
  findAllContent,
  getContent,
  getContentCount,
  updateContent,
  bulkUpdateContent,
  partialUpdateContent,
  softDeleteContent,
  deleteContent,
  deleteManyContent,
  softDeleteManyContent,
};
