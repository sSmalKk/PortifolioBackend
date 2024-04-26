/**
 * ContactRoutes.js
 * @description :: CRUD API routes for Contact
 */

const express = require('express');
const router = express.Router();
const ContactController = require('../../../controller/client/v1/ContactController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/client/api/v1/contact/create').post(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.addContact);
router.route('/client/api/v1/contact/list').post(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.findAllContact);
router.route('/client/api/v1/contact/count').post(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.getContactCount);
router.route('/client/api/v1/contact/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.getContact);
router.route('/client/api/v1/contact/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.updateContact);    
router.route('/client/api/v1/contact/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.partialUpdateContact);
router.route('/client/api/v1/contact/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.softDeleteContact);
router.route('/client/api/v1/contact/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.softDeleteManyContact);
router.route('/client/api/v1/contact/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.bulkInsertContact);
router.route('/client/api/v1/contact/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.bulkUpdateContact);
router.route('/client/api/v1/contact/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.deleteContact);
router.route('/client/api/v1/contact/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,ContactController.deleteManyContact);

module.exports = router;
