const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;  // Usar variável de ambiente para porta em produção
const DATA_FILE_PATH = path.join(__dirname, 'data', 'user.json');

// Middleware para analisar o corpo das requisições JSON
app.use(bodyParser.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Servir a página principal (index.html) na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para obter dados do user.json
app.get('/data/user.json', (req, res) => {
    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para atualizar dados do user.json
app.post('/data/user.json', (req, res) => {
    const newData = req.body;
    fs.writeFile(DATA_FILE_PATH, JSON.stringify(newData, null, 2), 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to write data file' });
        }
        res.json({ message: 'Data saved successfully' });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
