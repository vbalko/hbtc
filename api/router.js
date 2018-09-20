const express = require('express');

const router = new express.Router();

//ROOT
router.get("/",(req,res) => res.json({"root":"test1"}));

var handleRoot = (req,res) => {
    return res.json({"root":"test"});
};

module.exports = router;