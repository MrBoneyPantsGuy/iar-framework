const Salesman = require('../models/Salesman');

exports.getSalesmanById = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}

exports.createSalesman = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    const s1 = new Salesman(undefined, data["firstname"], data["lastname"], data["employeeId"], data["department"]);

    db.collection("personal").insertOne(s1, function (err, res) {
        if(err) {
            throw err;
        }  else {
            console.log("1 document inserted");
        }
    });

    res.status(200).send('OK');
}

exports.updateSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}

exports.deleteSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}