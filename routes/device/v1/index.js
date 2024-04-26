/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./ContactRoutes'));
router.use(require('./ContentRoutes'));
router.use(require('./ServiceRoutes'));
router.use(require('./CustomerRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./userRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./categoryRoutes'));

module.exports = router;
