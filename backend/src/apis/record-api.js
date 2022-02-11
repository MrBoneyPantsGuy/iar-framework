const PerformanceRecord = require('../models/PerformanceRecord');
const Approval = require('../models/Approval');
const {ObjectId} = require("mongodb");
const recordService = require("../services/record-service");
const orangeHRMService = require("../services/orangehrm-service");

exports.getRecordById = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    db.collection('record').find({"employeeId": id}).toArray((err, result) => {
        if(err) throw err;
        if(result === null) {
            res.status(404).send('Record not found');
        } else {
            res.status(200).send(result);
        }
    });
}

exports.createRecord = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    data.orderRecords.forEach((order) => {
        order.bonus = recordService.calculateBonusForOrder(order);
    })
    const bonusA = recordService.updateBonus(data.socialRecords);
    const bonusB = recordService.updateBonus(data.orderRecords);
    const approval = new Approval(false, false, false);
    const performanceRecord = new PerformanceRecord(undefined, data.year,data.employeeId,req.body.socialRecords, req.body.orderRecords, bonusA, bonusB, data.remark, approval);
    await orangeHRMService.updateBonusSalary(performanceRecord);
    db.collection('record').insertOne(performanceRecord, (err) => {
        if (err) res.status(500).send(err);
    })
    res.status(200).send('OK');
}

exports.updateRecord = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    data.orderRecords.forEach((order) => {
        order.bonus = recordService.calculateBonusForOrder(order);
    })
    const bonusA = recordService.updateBonus(data.socialRecords);
    const bonusB = recordService.updateBonus(data.orderRecords);
    const performanceRecord = { $set: {year: data.year, socialRecords: data.socialRecords, orderRecords: data.orderRecords, totalBonusA: bonusA, totalBonusB: bonusB, remark: data.remark}};
    let response = await orangeHRMService.updateBonusSalary(data);
    db.collection('record').updateOne({"_id": new ObjectId(data._id)}, performanceRecord, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("No such Record");
        } else {
            res.status(200).send(result);
        }
    })
}

exports.deleteRecord = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    db.collection('record').deleteOne({"_id": new ObjectId(id)}, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send('Record not found');
        } else {
            res.status(200).send("OK");
        }
    })
}

exports.approveRecord = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;                                                                          // get the request body
    const approval = JSON.parse(data.approval);                                                     // parse the incoming json object
    const updatedApproval = new Approval(approval["ceo"], approval["hr"], approval["salesman"]);    // create new Approval class with updated booleans
    const approve = { $set: {approval: updatedApproval}};                                           // setup the relevant part of the update statement for mongoDB
    db.collection('record').updateOne({"_id": new ObjectId(data._id)}, approve, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("No such Record");
        } else {
            res.status(200).send(result);
        }
    })
}