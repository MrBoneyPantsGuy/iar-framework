const Salesman = require('../models/Salesman');
const {ObjectId} = require("mongodb");
const DBService = require('../services/db-service');

exports.getSalesmanBySalesmanId = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["salesmanid"];

    db.collection("personal").findOne({"_id": new ObjectId(id)}, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("No such Salesman.");
        } else {
            res.status(200).send(result);
        }
    });
}

exports.getSalesmanByEmployeeId = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["employeeid"];

    db.collection("personal").findOne({"employeeId": id}, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("No such Salesman.");
        } else {
            res.status(200).send(result);
        }
    });
}

exports.getAllSalesman = async (req, res) => {
   const db = req.app.get('db');

   db.collection("personal").find({}).toArray( (err, result) => {
       if(err) throw err;
       if(result.length === 0) {
           res.status(404).send("Database currently has no salesman.")
       } else {
           res.status(200).send(result)
       }
   })
}

exports.querySalesmen = async (req, res) => {
    const db = req.app.get('db');
    res.status(404).send("Not yet implemented");
}

exports.createSalesman = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    const salesman = new Salesman(undefined, data["firstname"], data["lastname"], data["employeeId"], data["department"], data["code"]);

    let result = await DBService.storeSalesman(salesman).then(
        res.status(201).send('OK')
    ).catch(err => {
        res.status(500).send(err);
        console.log(err);
    });
}

exports.updateSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    const data = req.body;
    const salesman = { $set: {firstname: data.firstname, lastname: data.lastname, employeeId: data.employeeId, department: data.department, governmentId: data.governmentId}};

    db.collection("personal").updateOne({"_id": new ObjectId(id)}, salesman, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send(err);
        } else {
            res.status(200).send("OK");
        }
    });
}

exports.deleteSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    db.collection("personal").deleteOne({"_id": new ObjectId(id)}, (err, result) => {
        if (err) throw err;
        if(result === null) {
            res.status(404).send("no such Salesman");
        } else {
            res.status(200).send("OK");
        }
    })
}