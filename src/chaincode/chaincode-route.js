'use strict';

const express = require('express');
const router = express.Router();
const validatorClass = require('./validator');
const validator = new validatorClass();
const CcContoller = require('./chaincode-controller');
let chaincodeController = new CcContoller();

router.get('/', function (req, res, next) {
    // let result = chaincodeController.readRecords(req.body);
    let result = chaincodeController.readRecordByDocType(req.docType);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        console.log(" ======= ", result)
        res.status(400).json({ message: result.message });
    });
});

//read an record by id
router.get('/:id', function (req, res, next) {
    let recordId = req.params.id
    console.log("record id ", recordId)
    let result = chaincodeController.readRecordById(req, req.params.id);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

// create record
router.post('/', function (req, res, next) {    
    let result = chaincodeController.createRecord(req);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

//update record
router.put('/:id', function (req, res, next) {
    let recordId = req.params.id
    console.log("record id ", recordId)
    let result = chaincodeController.updateRecord(req);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

//delete an record by id
router.delete('/:id', function (req, res, next) {
    let deleteId = req.params.id
    let result = chaincodeController.deleteRecord(req);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

//read an record by id
router.get('/doc/:doc_type', function (req, res, next) {
    let docType = req.params.doc_type
    let result = chaincodeController.readRecordByDocType(docType);
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

//read history by key
router.get('/history/:key', function (req, res, next) {
    let key = req.params.key
    console.log("key is :", key)
    let result = chaincodeController.readHistoryBykey(req, req.params.key);
    console.log("result is :", result)
    result.then(result => {
        res.status(result.status).json(result.data);
    }).catch(result => {
        res.status(result.status || 500).json({ message: result.message });
    });
});

module.exports = router;