exports.getSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}

exports.createSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(500).send('Interner Server Fehler');
}

exports.updateSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}

exports.deleteSalesman = async (req, res) => {
    const db = req.app.get('db');

    res.status(404).send('Salesman not found');
}