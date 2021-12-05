const Salesman = require("../models/Salesman");
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri);

exports.storeSalesman = async (salesman) => {
    try {
        await client.connect();
        await client.db('intArch').collection("personal").insertOne(salesman, (err) => {
            if (err) throw err;
            else console.log(salesman.firstname + " " + salesman.lastname + " inserted");
        });
    } catch(err) {
        console.log(err);
    }
}