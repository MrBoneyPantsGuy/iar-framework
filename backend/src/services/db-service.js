const Salesman = require("../models/Salesman");
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri);
const PerformanceRecord = require('../models/PerformanceRecord');
const SocialRecord = require('../models/SocialRecord');
const OrdersRecord = require('../models/OrdersRecord');

exports.storeSalesman = async (salesman) => {
    try {
        await client.connect();
        let checkSalesman = await client.db('intArch').collection("personal").findOne({"employeeId": salesman.employeeId});
        if(checkSalesman === null) {
            await client.db('intArch').collection("personal").insertOne(salesman, (err) => {
                if (err) throw err;
                else console.log(salesman.firstname + " " + salesman.lastname + " inserted");
            });
        } else {
            console.log("Salesman already in DB!");
        }
    } catch(err) {
        console.log(err);
    }
}

exports.storeRecord = async (salesorder) => {
    try {
        await client.connect();
        let checkRecord = await client.db('intArch').collection("record").findOne({"salesmanId": salesorder.salesmanId, "year": salesorder.year});
        let salesman = await client.db('intArch').collection("person").findOne({"governmentId": salesorder.governmentId});
        console.log(salesman);
        let orders = [];
        if(salesorder.itemsHooverClean !== undefined){
            let hooverClean = new OrdersRecord("HooverClean", salesorder.customername, salesorder.clientRankingNumber, salesorder.itemsHooverClean, 0, "");
            orders.push(hooverClean);
        }
        if(salesorder.itemsHooverGo !== undefined ){
            let hooverGo = new OrdersRecord("HooverGo", salesorder.customername, salesorder.clientRankingNumber, salesorder.itemsHooverGo, 0, "");
            orders.push(hooverGo);
        }
        let social = [];
        let competence = ["Leadership Competence", "Openness to Employee", "Social Behaviour to Employee", "Attitude towards Client", "Communication Skills", "Integrity to Company"]
        competence.forEach((c) => {
            let socialRecord = new SocialRecord(c, 0,0,0,"");
            social.push(socialRecord);
        });
        if(checkRecord === null) {
            let performanceRecord = new PerformanceRecord(undefined, salesorder.year, salesman.employeeId, social, orders, 0, 0, "")
            await client.db('intArch').collection("record").insertOne(performanceRecord, (err) => {
                if (err) throw err;
                else console.log(performanceRecord.year + " " + performanceRecord.employeeId + " inserted");
            });
        } else {
            //TODO
        }
    } catch(err) {
        console.log(err);
    }
}