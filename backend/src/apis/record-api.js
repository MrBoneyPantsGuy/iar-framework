exports.getRecordById = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
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