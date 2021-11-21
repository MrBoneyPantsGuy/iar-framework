const Salesman = require('../models/Salesman');
const {ObjectId} = require("mongodb");

exports.getSalesmanBySalesmanId = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["salesmanid"];

    db.collection("personal").findOne({"_id": new ObjectId(id)}, (err, result) => {
        if (err) res.status(404).send("No such Salesman.");
        console.log(typeof result);
        res.status(200).send(result);
    });
}

exports.getSalesmanByEmployeeId = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["employeeid"];

    db.collection("personal").findOne({"employeeId": id}, (err, result) => {
        if (err) res.status(404).send("No such Salesman.");
        res.status(200).send(result);
    });
}

exports.querySalesmen = async (req, res) => {
    const db = req.app.get('db');
    res.status(404).send("Not yet implemented");
}

exports.createSalesman = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    const salesman = new Salesman(undefined, data["firstname"], data["lastname"], data["employeeId"], data["department"]);

    db.collection("personal").insertOne(salesman, (err) => {
        if (err) res.status(500).send(err);
        console.log(salesman.firstname + " " + salesman.lastname + " inserted");
    });
    res.status(201).send('OK');
}

exports.updateSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    const data = req.body;
    const salesman = { $set: {firstname: data.firstname, lastname: data.lastname, employeeId: data.employeeId, department: data.department}};

    db.collection("personal").updateOne({"_id": new ObjectId(id)}, salesman, (err) => {
        if (err) res.status(404).send(err);
        res.status(200).send("OK");
    });
}

exports.deleteSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    db.collection("personal").deleteOne({"_id": new ObjectId(id)}, (err) => {
        if (err) res.status(404).send("no such Salesman");
        res.status(200).send("OK");
    })
}