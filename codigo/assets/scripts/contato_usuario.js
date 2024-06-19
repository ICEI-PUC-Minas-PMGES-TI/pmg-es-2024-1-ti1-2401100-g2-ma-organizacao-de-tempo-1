document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar os dados armazenados e exibi-los na tabela
    function loadData() {
        const tbody = document.querySelector('#data-table tbody');
        tbody.innerHTML = ''; // Limpa o conteúdo da tabela

        const data = JSON.parse(localStorage.getItem('formData')) || [];
        
        data.forEach((item, index) => {
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
    }

    // Função para excluir um dado
    window.deleteData = function(index) {
        let data = JSON.parse(localStorage.getItem('formData')) || [];
        data.splice(index, 1);
        localStorage.setItem('formData', JSON.stringify(data));
        loadData();
    }

    // Função para editar um dado
    window.editData = function(index) {
        const data = JSON.parse(localStorage.getItem('formData')) || [];
        const item = data[index];
        
        // Preenche o formulário com os dados para edição
        document.getElementById('edit-nome').value = item.nome;
        document.getElementById('edit-email').value = item.email;
        document.getElementById('edit-assunto').value = item.assunto;
        document.getElementById('edit-mensagem').value = item.menssagem;
        
        // Mostra o formulário de edição
        document.getElementById('edit-form-container').style.display = 'block';

        // Atualiza os dados ao salvar
        document.getElementById('save').onclick = function() {
            data[index] = {
                nome: document.getElementById('edit-nome').value,
                email: document.getElementById('edit-email').value,
                assunto: document.getElementById('edit-assunto').value,
                menssagem: document.getElementById('edit-mensagem').value,
            };
            localStorage.setItem('formData', JSON.stringify(data));
            loadData();
            clearForm();
            document.getElementById('edit-form-container').style.display = 'none'; // Esconde o formulário de edição após salvar
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
    document.getElementById('add-new').onclick = function() {
        window.location.href = 'cadastro_contato.html'; // Substitua 'add.html' pelo caminho correto para a página de adição de novo item
    }

    // Carrega os dados ao carregar a página
    loadData();
});
