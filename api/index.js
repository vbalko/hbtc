const express = require('express');
const rHandle = require('./router');

const router = new express.Router(); 

//handle routes
router.use('/',rHandle);

module.exports = router;