/**
 * ContentRoutes.js
 * @description :: CRUD API routes for Content
 */

const express = require('express');
const router = express.Router();
const ContentController = require('../../../controller/device/v1/ContentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/content/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.addContent);
router.route('/device/api/v1/content/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.findAllContent);
router.route('/device/api/v1/content/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.getContentCount);
router.route('/device/api/v1/content/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.getContent);
router.route('/device/api/v1/content/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.updateContent);    
router.route('/device/api/v1/content/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.partialUpdateContent);
router.route('/device/api/v1/content/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.softDeleteContent);
router.route('/device/api/v1/content/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.softDeleteManyContent);
router.route('/device/api/v1/content/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.bulkInsertContent);
router.route('/device/api/v1/content/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.bulkUpdateContent);
router.route('/device/api/v1/content/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.deleteContent);
router.route('/device/api/v1/content/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ContentController.deleteManyContent);

module.exports = router;
