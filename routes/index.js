const router = require('express').Router();
const equipment = require('./equipment');

router.use('/demo-app', equipment);

module.exports = router;