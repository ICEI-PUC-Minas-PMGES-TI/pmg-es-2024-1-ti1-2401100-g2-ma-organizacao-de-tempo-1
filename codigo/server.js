const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE_PATH = path.join(__dirname, 'data', 'user.json');
const INFO_FILE_PATH = path.join(__dirname, 'data', 'info.json');

// Middleware para analisar o corpo das requisições JSON
app.use(bodyParser.json());

// Configurar o armazenamento de arquivos com multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'projetos', 'assets', 'images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

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

// Endpoint para adicionar um novo usuário no user.json
app.post('/data/user', (req, res) => {
    const newUser = req.body;

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.users.push(newUser);

        fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data file' });
            }
            res.json({ message: 'User added successfully' });
        });
    });
});

// Endpoint para autenticar usuário
app.post('/data/user/authenticate', (req, res) => {
    const { username, password } = req.body;

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => (user.username === username || user.email === username) && user.password === password);

        if (user) {
            res.json(user);
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// Endpoint para atualizar dados no user.json
app.post('/data/user.json', (req, res) => {
    const updatedUser = req.body;

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(user => user.id === updatedUser.id);

        if (userIndex !== -1) {
            jsonData.users[userIndex] = updatedUser;

            fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to write data file' });
                }
                res.json({ message: 'Data updated successfully' });
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para deletar usuário no user.json
app.delete('/data/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.users = jsonData.users.filter(user => user.id !== userId);

        fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data file' });
            }
            res.json({ message: 'User deleted successfully' });
        });
    });
});

// Endpoint para obter dados do info.json
app.get('/data/info.json', (req, res) => {
    fs.readFile(INFO_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para substituir dados no info.json
app.post('/data/info.json', upload.single('image'), (req, res) => {
    const newData = req.body;
    if (req.file) {
        newData.image = `/projetos/assets/images/${req.file.filename}`;
    }

    fs.readFile(INFO_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.descriptions.push(newData);

        fs.writeFile(INFO_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to write data file' });
            }
            res.json({ message: 'Data saved successfully' });
        });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});