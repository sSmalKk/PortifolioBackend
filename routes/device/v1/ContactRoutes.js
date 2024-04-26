/**
 * ContactRoutes.js
 * @description :: CRUD API routes for Contact
 */

const express = require('express');
const router = express.Router();
const ContactController = require('../../../controller/device/v1/ContactController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/contact/create').post(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.addContact);
router.route('/device/api/v1/contact/list').post(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.findAllContact);
router.route('/device/api/v1/contact/count').post(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.getContactCount);
router.route('/device/api/v1/contact/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.getContact);
router.route('/device/api/v1/contact/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.updateContact);    
router.route('/device/api/v1/contact/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.partialUpdateContact);
router.route('/device/api/v1/contact/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.softDeleteContact);
router.route('/device/api/v1/contact/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.softDeleteManyContact);
router.route('/device/api/v1/contact/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.bulkInsertContact);
router.route('/device/api/v1/contact/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.bulkUpdateContact);
router.route('/device/api/v1/contact/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.deleteContact);
router.route('/device/api/v1/contact/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,ContactController.deleteManyContact);

module.exports = router;
