const PerformanceRecord = require('../models/PerformanceRecord');
const SocialRecord = require('../models/SocialRecord');
const OrdersRecord = require('../models/OrdersRecord');

exports.getRecordById = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];

    db.collection('record').findOne({"_id": id}, (err, result) => {
        if(err) res.status(404).send('Record not found');
        else res.status(200).send(result);
    });
}

exports.createRecord = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    let socialRecords = [];
    let orderRecords = [];
    let recordZwischenspeicher;

    data.socialRecords.forEach((item) => {
        recordZwischenspeicher = new SocialRecord(item.competence, item.targetValue, item.actualValue, item.bonus, item.remark);
        socialRecords.push(recordZwischenspeicher);
    })
    data.ordersRecords.forEach((item) => {
        recordZwischenspeicher = new OrdersRecord(item.productname, item.client, item.clientRanking, item.itemsSold, item.bonus, item.remark);
        orderRecords.push(recordZwischenspeicher);
    })
    const performanceRecord = new PerformanceRecord(undefined, data.salesmanId, socialRecords, orderRecords, data.totalBonusA, data.totalBonusB, data.remark);

    db.collection('record')    .insertOne(performanceRecord, (err) => {
        if (err) res.status(500).send(err);
    })
    res.status(200).send('OK');
}

exports.updateRecord = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}

exports.deleteRecord = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}