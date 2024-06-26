const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data', 'user.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'projetos')));

app.get('/data/user.json', (req, res) => {
    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

app.post('/data/user.json', (req, res) => {
    const newData = req.body;
    fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write data file' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
