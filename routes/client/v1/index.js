/**
 * index route file of client platform.
 * @description: exports all routes of client platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/client/auth',require('./auth'));
router.use(require('./ContactRoutes'));
router.use(require('./ContentRoutes'));
router.use(require('./ServiceRoutes'));
router.use(require('./CustomerRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./userRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./categoryRoutes'));

module.exports = router;
