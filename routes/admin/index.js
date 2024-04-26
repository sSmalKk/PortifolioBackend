/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./ContactRoutes'));
router.use(require('./ContentRoutes'));
router.use(require('./ServiceRoutes'));
router.use(require('./CustomerRoutes'));
router.use(require('./BlogRoutes'));
router.use(require('./userRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
