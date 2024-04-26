/**
 * ServiceRoutes.js
 * @description :: CRUD API routes for Service
 */

const express = require('express');
const router = express.Router();
const ServiceController = require('../../../controller/client/v1/ServiceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/service/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.addService);
router.route('/client/api/v1/service/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.findAllService);
router.route('/client/api/v1/service/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.getServiceCount);
router.route('/client/api/v1/service/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.getService);
router.route('/client/api/v1/service/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.updateService);    
router.route('/client/api/v1/service/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.partialUpdateService);
router.route('/client/api/v1/service/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.softDeleteService);
router.route('/client/api/v1/service/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.softDeleteManyService);
router.route('/client/api/v1/service/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.bulkInsertService);
router.route('/client/api/v1/service/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.bulkUpdateService);
router.route('/client/api/v1/service/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.deleteService);
router.route('/client/api/v1/service/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ServiceController.deleteManyService);

module.exports = router;
