/**
 * ContentRoutes.js
 * @description :: CRUD API routes for Content
 */

const express = require('express');
const router = express.Router();
const ContentController = require('../../../controller/client/v1/ContentController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/content/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.addContent);
router.route('/client/api/v1/content/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.findAllContent);
router.route('/client/api/v1/content/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.getContentCount);
router.route('/client/api/v1/content/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.getContent);
router.route('/client/api/v1/content/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.updateContent);    
router.route('/client/api/v1/content/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.partialUpdateContent);
router.route('/client/api/v1/content/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.softDeleteContent);
router.route('/client/api/v1/content/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.softDeleteManyContent);
router.route('/client/api/v1/content/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.bulkInsertContent);
router.route('/client/api/v1/content/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.bulkUpdateContent);
router.route('/client/api/v1/content/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.deleteContent);
router.route('/client/api/v1/content/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ContentController.deleteManyContent);

module.exports = router;
