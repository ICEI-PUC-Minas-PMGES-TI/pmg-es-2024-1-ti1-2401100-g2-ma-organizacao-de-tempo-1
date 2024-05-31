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
        document.getElementById('nome').value = item.nome;
        document.getElementById('email').value = item.email;
        document.getElementById('assunto').value = item.assunto;
        document.getElementById('menssagem').value = item.menssagem;
        
        // Atualiza os dados ao salvar
        document.getElementById('save').onclick = function() {
            data[index] = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                assunto: document.getElementById('assunto').value,
                menssagem: document.getElementById('menssagem').value,
            };
            localStorage.setItem('formData', JSON.stringify(data));
            loadData();
            clearForm();
        }
    }

    // Função para limpar o formulário
    function clearForm() {
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('assunto').value = '';
        document.getElementById('menssagem').value = '';
    }

    // Carrega os dados ao carregar a página
    loadData();
});
