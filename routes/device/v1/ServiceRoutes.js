/**
 * ServiceRoutes.js
 * @description :: CRUD API routes for Service
 */

const express = require('express');
const router = express.Router();
const ServiceController = require('../../../controller/device/v1/ServiceController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/service/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.addService);
router.route('/device/api/v1/service/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.findAllService);
router.route('/device/api/v1/service/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.getServiceCount);
router.route('/device/api/v1/service/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.getService);
router.route('/device/api/v1/service/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.updateService);    
router.route('/device/api/v1/service/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.partialUpdateService);
router.route('/device/api/v1/service/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.softDeleteService);
router.route('/device/api/v1/service/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.softDeleteManyService);
router.route('/device/api/v1/service/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.bulkInsertService);
router.route('/device/api/v1/service/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.bulkUpdateService);
router.route('/device/api/v1/service/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.deleteService);
router.route('/device/api/v1/service/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ServiceController.deleteManyService);

module.exports = router;
