document.addEventListener('DOMContentLoaded', function () {
    loadData();

    document.getElementById('add-new').addEventListener('click', function () {
        window.location.href = 'cadastro_contato_user.html';
    });
});

function loadData() {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // Limpa o conteúdo da tabela

    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user && user.contatos) {
        user.contatos.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.assunto}</td>
                <td>${item.mensagem}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editData(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">Excluir</button>
                </td>
            `;

            tbody.appendChild(row);
        });
    } else {
        console.error('Nenhum contato encontrado para o usuário logado.');
    }
}

window.deleteData = function (index) {
    let user = JSON.parse(localStorage.getItem('loggedInUser'));
    user.contatos.splice(index, 1);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    updateUsuarios(user);

    loadData();
}

window.editData = function (index) {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const item = user.contatos[index];

    document.getElementById('edit-nome').value = item.nome;
    document.getElementById('edit-email').value = item.email;
    document.getElementById('edit-assunto').value = item.assunto;
    document.getElementById('edit-mensagem').value = item.mensagem;

    document.getElementById('edit-form-container').style.display = 'block';

    document.getElementById('save').onclick = function () {
        user.contatos[index] = {
            nome: document.getElementById('edit-nome').value,
            email: document.getElementById('edit-email').value,
            assunto: document.getElementById('edit-assunto').value,
            mensagem: document.getElementById('edit-mensagem').value,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        updateUsuarios(user);

        loadData();
        clearForm();
        document.getElementById('edit-form-container').style.display = 'none';
    }
}

function updateUsuarios(updatedUser) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.map(user => user.id === updatedUser.id ? updatedUser : user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function clearForm() {
    document.getElementById('edit-nome').value = '';
    document.getElementById('edit-email').value = '';
    document.getElementById('edit-assunto').value = '';
    document.getElementById('edit-mensagem').value = '';
}
