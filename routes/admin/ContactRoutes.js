/**
 * ContactRoutes.js
 * @description :: CRUD API routes for Contact
 */

const express = require('express');
const router = express.Router();
const ContactController = require('../../controller/admin/ContactController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/contact/create').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.addContact);
router.route('/admin/contact/list').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.findAllContact);
router.route('/admin/contact/count').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.getContactCount);
router.route('/admin/contact/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.getContact);
router.route('/admin/contact/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.updateContact);    
router.route('/admin/contact/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.partialUpdateContact);
router.route('/admin/contact/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.softDeleteContact);
router.route('/admin/contact/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.softDeleteManyContact);
router.route('/admin/contact/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.bulkInsertContact);
router.route('/admin/contact/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.bulkUpdateContact);
router.route('/admin/contact/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.deleteContact);
router.route('/admin/contact/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,ContactController.deleteManyContact);

module.exports = router;
