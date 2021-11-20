exports.getRecordById = async (req, res) => {
    const db = req.app.get('db');
    const id = req.params["id"];
    let recordCollection = db.collection('record');

    recordCollection.findOne({"_recordId": id}, (err, result) => {
        if(err) res.status(404).send('Record not found');
        else res.status(200).send(result);
    });
}

exports.createRecord = async (req, res) => {
    const db = req.app.get('db');

    res.status(500).send('Interner Server Fehler');
}

exports.updateRecord = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}

exports.deleteRecord = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}