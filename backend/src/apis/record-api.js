exports.getRecords = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}

exports.createRecords = async (req, res) => {
    const db = req.app.get('db');

    res.status(500).send('Interner Server Fehler');
}

exports.updateRecords = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}

exports.deleteRecords = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Record not found');
}