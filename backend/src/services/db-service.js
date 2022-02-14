const Salesman = require("../models/Salesman");
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri);
const PerformanceRecord = require('../models/PerformanceRecord');
const SocialRecord = require('../models/SocialRecord');
const OrdersRecord = require('../models/OrderRecord');
const Approval = require("../models/Approval");
const recordService = require("../services/record-service");
const {ObjectId} = require("mongodb");

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
    // Only try to create salesorder when govermentId is set!
    let orders = [];
    let social = [];
    if(salesorder.governmentId !== undefined) {
        try {
            await client.connect();
            let salesman = await client.db('intArch').collection("personal").findOne({"governmentId": salesorder.governmentId.toString()});
            let checkRecord = await client.db('intArch').collection("record").findOne({
                "employeeId": salesman.employeeId,
                "year": salesorder.year
            });
            if(salesorder.itemsHooverClean !== undefined) {
                let hooverClean = new OrdersRecord("HooverClean", salesorder.customername, salesorder.clientRankingNumber, salesorder.itemsHooverClean, 0, "");
                hooverClean.bonus = recordService.calculateBonusForOrder(hooverClean);
                orders.push(hooverClean);
            }
            if (salesorder.itemsHooverGo !== undefined) {
                let hooverGo = new OrdersRecord("HooverGo", salesorder.customername, salesorder.clientRankingNumber, salesorder.itemsHooverGo, 0, "");
                hooverGo.bonus = recordService.calculateBonusForOrder(hooverGo);
                orders.push(hooverGo);
            }
            let competence = ["Leadership Competence", "Openness to Employee", "Social Behaviour to Employee", "Attitude towards Client", "Communication Skills", "Integrity to Company"]
            competence.forEach((c) => {
                let socialRecord = new SocialRecord(c, 0, 0, 0, "");
                social.push(socialRecord);
            });
            if (checkRecord === null) {
                const approval = new Approval(false, false, false);
                const bonusA = recordService.updateBonus(orders);
                const bonusB = recordService.updateBonus(social);
                let performanceRecord = new PerformanceRecord(undefined, salesorder.year, salesman.employeeId, social, orders, bonusA, bonusB, "", approval);
                await client.db('intArch').collection("record").insertOne(performanceRecord, (err) => {
                    if (err) throw err;
                    else console.log(performanceRecord.year + " " + performanceRecord.employeeId + " inserted");
                });
            } else {
                // check if orders to add are already in the array by a hopefully unique combination
                orders.forEach((order) => {
                    let isAlreadyStored = checkRecord.orderRecords.some(element => {
                        return(element.client == order.client
                            && element.clientRanking == order.clientRanking
                            && element.itemsSold == order.itemsSold
                            && element.bonus == order.bonus
                        )
                    });

                    if(!isAlreadyStored) {  // push new order to array
                        let {...object} = order;
                        checkRecord.orderRecords.push(object);
                    } else {
                        console.log("ITS ALREADY STORED!");
                    }
                });

                checkRecord.totalBonusA = recordService.updateBonus(checkRecord.orderRecords);
                const performanceRecord = { $set: {orderRecords: checkRecord.orderRecords, totalBonusA: checkRecord.totalBonusA, totalBonusB: checkRecord.totalBonusB}};
                await client.db('intArch').collection("record").updateOne({"_id": new ObjectId(checkRecord._id)}, performanceRecord, (err) => {
                    if (err) throw err;
                    else console.log(checkRecord.year + " " + checkRecord.employeeId + " updated");
                });
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Could not create SalesRecord cause of missing governmentId!")
    }
}