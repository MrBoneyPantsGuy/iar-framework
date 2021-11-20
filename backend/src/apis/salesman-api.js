const Salesman = require('../models/Salesman');
const {ObjectId} = require("mongodb");

exports.getSalesmanById = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    let personalCollection = db.collection('personal');

    // helper function with callback to access the result form outside...
    function returnSalesmanFromCollection(collection, callback) {
        //TODO: employeeID ist nicht die id in der DB sondern gleich benannt, _id ist salesmanid. Warum nicht findOne?
        collection.find({"employeeId": id}).toArray(function (err, result) {
            if(err) throw err;
            else callback(result);
        });
    }

    // call the helper function and return its results
    returnSalesmanFromCollection(personalCollection, function(result) {
        res.status(200).send(result[0]);
    })
}

exports.createSalesman = async (req, res) => {
    const db = req.app.get('db');
    const data = req.body;
    const s1 = new Salesman(undefined, data["firstname"], data["lastname"], data["employeeId"], data["department"]);

    db.collection("personal").insertOne(s1, function (err, res) {
        if(err) {
            throw err;
        }  else {
            console.log(s1.firstname + " " + s1.lastname + " inserted");
        }
    });

    res.status(200).send('OK');
}

exports.updateSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    const personalCollection = db.collection("personal");
    const data = req.body;
    const update = { $set: {firstname: data["firstname"], lastname: data["lastname"], employeeId: data["employeeId"], department: data["department"]}};

    // helper function with callback to access the result form outside...
    function returnSalesmanFromCollection(collection, callback) {
        collection.find({"_id": new ObjectId(id)}).toArray(function (err, result) {
            if(err) throw err;
            else callback(result);
        });
    }

    returnSalesmanFromCollection(personalCollection, function(result) {
        if(result.length === 0) {
            res.status(404).send('Salesman not found');
        } else {
            db.collection("personal").updateOne({"_id": ObjectId(id)}, update, function (err, res) {
                if(err) throw err;
                console.log('Salesman with id '+ id + ' updated');
            });
            res.status(200).send('Salesman with id '+ id + ' updated');
        }
    });
}

exports.deleteSalesman = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    const personalCollection = db.collection("personal");

    // helper function with callback to access the result form outside...
    function returnSalesmanFromCollection(collection, callback) {
        collection.find({"_id": new ObjectId(id)}).toArray(function (err, result) {
            if(err) throw err;
            else callback(result);
        });
    }

    returnSalesmanFromCollection(personalCollection, function(result) {
        if(result.length === 0) {
            res.status(404).send('Salesman not found');
        } else {
            db.collection("personal").deleteOne({"_id": ObjectId(id)}, function (err, res) {
                if(err) throw err;
                console.log('Salesman with id '+ id + ' deleted');
            });
            res.status(200).send('Salesman with id '+ id + ' deleted');
        }
    });
}