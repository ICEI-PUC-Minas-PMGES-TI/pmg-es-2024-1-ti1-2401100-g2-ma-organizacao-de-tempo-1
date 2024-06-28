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
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint para adicionar um novo usuário no user.json
app.post('/data/user', (req, res) => {
    const newUser = req.body;
    console.log('Tentativa de adicionar novo usuário:', newUser);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.users.push(newUser);

        fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo user.json:', err);
                return res.status(500).json({ error: 'Failed to write data file' });
            }
            res.json({ message: 'User added successfully' });
        });
    });
});

// Endpoint para autenticar usuário
app.post('/data/user/authenticate', (req, res) => {
    const { username, password } = req.body;
    console.log('Tentativa de autenticação:', { username, password });

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => (user.username === username || user.email === username) && user.password === password);

        if (user) {
            console.log('Usuário autenticado:', user);
            res.json(user);
        } else {
            console.error('Usuário ou senha inválidos');
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// Endpoint para adicionar um contato a um usuário específico
app.post('/data/user/:id/contato', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const novoContato = req.body;
    console.log(`Tentativa de adicionar contato para o usuário ${userId}:`, novoContato);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user) {
            if (!user.contatos) {
                user.contatos = [];
            }
            const novoIdContato = user.contatos.length ? user.contatos[user.contatos.length - 1].id + 1 : 1;
            novoContato.id = novoIdContato;
            user.contatos.push(novoContato);

            fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo user.json:', err);
                    return res.status(500).json({ error: 'Failed to write data file' });
                }
                res.json({ message: 'Contato added successfully' });
            });
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para atualizar um contato de um usuário específico
app.put('/data/user/:id/contato/:contactId', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const contactId = parseInt(req.params.contactId, 10);
    const updatedContato = req.body;
    console.log(`Tentativa de atualizar contato ${contactId} do usuário ${userId}:`, updatedContato);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user && user.contatos) {
            const contactIndex = user.contatos.findIndex(contact => contact.id === contactId);
            if (contactIndex !== -1) {
                updatedContato.id = contactId; // Ensure the ID remains the same
                user.contatos[contactIndex] = updatedContato;
                fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo user.json:', err);
                        return res.status(500).json({ error: 'Failed to write data file' });
                    }
                    res.json({ message: 'Contato updated successfully' });
                });
            } else {
                console.error('Contato não encontrado:', contactId);
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para deletar um contato de um usuário específico
app.delete('/data/user/:id/contato/:contactId', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const contactId = parseInt(req.params.contactId, 10);
    console.log(`Tentativa de deletar contato ${contactId} do usuário ${userId}`);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user && user.contatos) {
            const contactIndex = user.contatos.findIndex(contact => contact.id === contactId);
            if (contactIndex !== -1) {
                user.contatos.splice(contactIndex, 1);
                fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo user.json:', err);
                        return res.status(500).json({ error: 'Failed to write data file' });
                    }
                    res.json({ message: 'Contato deleted successfully' });
                });
            } else {
                console.error('Contato não encontrado:', contactId);
                res.status(404).json({ error: 'Contact not found' });
            }
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para adicionar uma tarefa a um usuário específico
app.post('/data/user/:id/tarefa', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const novaTarefa = req.body;
    console.log(`Tentativa de adicionar tarefa para o usuário ${userId}:`, novaTarefa);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user) {
            if (!user.tarefas) {
                user.tarefas = [];
            }
            const novoIdTarefa = user.tarefas.length ? user.tarefas[user.tarefas.length - 1].id + 1 : 1;
            novaTarefa.id = novoIdTarefa;
            user.tarefas.push(novaTarefa);

            fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo user.json:', err);
                    return res.status(500).json({ error: 'Failed to write data file' });
                }
                res.json({ message: 'Tarefa added successfully' });
            });
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para atualizar uma tarefa de um usuário específico
app.put('/data/user/:id/tarefa/:taskId', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const taskId = parseInt(req.params.taskId, 10);
    const updatedTarefa = req.body;
    console.log(`Tentativa de atualizar tarefa ${taskId} do usuário ${userId}:`, updatedTarefa);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user && user.tarefas) {
            const taskIndex = user.tarefas.findIndex(tarefa => tarefa.id === taskId);
            if (taskIndex !== -1) {
                updatedTarefa.id = taskId; // Ensure the ID remains the same
                user.tarefas[taskIndex] = updatedTarefa;
                fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo user.json:', err);
                        return res.status(500).json({ error: 'Failed to write data file' });
                    }
                    res.json({ message: 'Tarefa updated successfully' });
                });
            } else {
                console.error('Tarefa não encontrada:', taskId);
                res.status(404).json({ error: 'Task not found' });
            }
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para deletar uma tarefa de um usuário específico
app.delete('/data/user/:id/tarefa/:taskId', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const taskId = parseInt(req.params.taskId, 10);
    console.log(`Tentativa de deletar tarefa ${taskId} do usuário ${userId}`);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const user = jsonData.users.find(user => user.id === userId);

        if (user && user.tarefas) {
            const taskIndex = user.tarefas.findIndex(tarefa => tarefa.id === taskId);
            if (taskIndex !== -1) {
                user.tarefas.splice(taskIndex, 1);
                fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo user.json:', err);
                        return res.status(500).json({ error: 'Failed to write data file' });
                    }
                    res.json({ message: 'Tarefa deleted successfully' });
                });
            } else {
                console.error('Tarefa não encontrada:', taskId);
                res.status(404).json({ error: 'Task not found' });
            }
        } else {
            console.error('Usuário não encontrado:', userId);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para atualizar dados no user.json
app.post('/data/user.json', (req, res) => {
    const updatedUser = req.body;
    console.log('Tentativa de atualizar usuário:', updatedUser);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        const userIndex = jsonData.users.findIndex(user => user.id === updatedUser.id);

        if (userIndex !== -1) {
            jsonData.users[userIndex] = updatedUser;

            fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error('Erro ao escrever no arquivo user.json:', err);
                    return res.status(500).json({ error: 'Failed to write data file' });
                }
                res.json({ message: 'Data updated successfully' });
            });
        } else {
            console.error('Usuário não encontrado:', updatedUser.id);
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint para deletar usuário no user.json
app.delete('/data/user/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    console.log(`Tentativa de deletar usuário ${userId}`);

    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo user.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.users = jsonData.users.filter(user => user.id !== userId);

        fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo user.json:', err);
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
            console.error('Erro ao ler o arquivo info.json:', err);
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
            console.error('Erro ao ler o arquivo info.json:', err);
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        let jsonData = JSON.parse(data);
        jsonData.descriptions.push(newData);

        fs.writeFile(INFO_FILE_PATH, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever no arquivo info.json:', err);
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
