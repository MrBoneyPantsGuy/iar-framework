const PerformanceRecord = require('../models/PerformanceRecord');
const {ObjectId} = require("mongodb");

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
    const performanceRecord = new PerformanceRecord(undefined, data.year,data.employeeId, JSON.parse(req.body.socialRecords), JSON.parse(req.body.orderRecords), data.totalBonusA, data.totalBonusB, data.remark);

    db.collection('record').insertOne(performanceRecord, (err) => {
        if (err) res.status(500).send(err);
    })
    res.status(200).send('OK');
}

exports.updateRecord = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    const performanceRecord = { $set: {year: data.year, socialRecords: JSON.parse(data.socialRecords), orderRecords: JSON.parse(data.orderRecords), totalBonusA: data.totalBonusA, totalBonusB: data.totalBonusB, remark: data.remark}};

    db.collection('record').updateOne({"_id": new ObjectId(data.recordId)}, performanceRecord, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("No such Record");
        } else {
            res.status(200).send('OK');
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