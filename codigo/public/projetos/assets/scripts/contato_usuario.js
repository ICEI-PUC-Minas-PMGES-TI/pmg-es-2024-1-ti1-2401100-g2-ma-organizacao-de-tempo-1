document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar os dados armazenados e exibi-los na tabela
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
                    <td>${item.menssagem}</td>
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

    // Função para excluir um dado
    window.deleteData = function (index) {
        let user = JSON.parse(localStorage.getItem('loggedInUser'));
        user.contatos.splice(index, 1);
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Sincroniza com o servidor
        fetch(`/data/user/${user.id}/contato/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log('Contato deletado com sucesso:', data);
                loadData();
            })
            .catch((error) => {
                console.error('Erro ao deletar contato:', error);
            });
    }

    // Função para editar um dado
    window.editData = function (index) {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        const item = user.contatos[index];

        // Preenche o formulário com os dados para edição
        document.getElementById('edit-nome').value = item.nome;
        document.getElementById('edit-email').value = item.email;
        document.getElementById('edit-assunto').value = item.assunto;
        document.getElementById('edit-mensagem').value = item.menssagem;

        // Mostra o formulário de edição
        document.getElementById('edit-form-container').style.display = 'block';

        // Atualiza os dados ao salvar
        document.getElementById('save').onclick = function () {
            user.contatos[index] = {
                nome: document.getElementById('edit-nome').value,
                email: document.getElementById('edit-email').value,
                assunto: document.getElementById('edit-assunto').value,
                menssagem: document.getElementById('edit-mensagem').value,
            };
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Sincroniza com o servidor
            fetch(`/data/user/${user.id}/contato/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user.contatos[index])
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Contato editado com sucesso:', data);
                    loadData();
                    clearForm();
                    document.getElementById('edit-form-container').style.display = 'none'; // Esconde o formulário de edição após salvar
                })
                .catch((error) => {
                    console.error('Erro ao editar contato:', error);
                });
        }
    }

    // Função para limpar o formulário
    function clearForm() {
        document.getElementById('edit-nome').value = '';
        document.getElementById('edit-email').value = '';
        document.getElementById('edit-assunto').value = '';
        document.getElementById('edit-mensagem').value = '';
    }

    // Redireciona para a página de adição de novo item
    document.getElementById('add-new').onclick = function () {
        window.location.href = 'cadastro_contato_user.html'; // Substitua 'add.html' pelo caminho correto para a página de adição de novo item
    }

    // Carrega os dados ao carregar a página
    loadData();
});
