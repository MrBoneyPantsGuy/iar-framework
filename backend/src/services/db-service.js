const Salesman = require("../models/Salesman");

// TODO get access to DB somehow
exports.storeSalesman = async (salesman) => {
    db.collection("personal").insertOne(salesman, (err) => {
        if (err) throw err;
        else console.log(salesman.firstname + " " + salesman.lastname + " inserted");
    });
}