let indiceEdicao = null;

// Função para preencher a lista de pessoas cadastradas
function preencherListaPessoas() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    const listaPessoas = document.getElementById('listaPessoas');

    listaPessoas.innerHTML = '';

    pessoas.forEach((pessoa, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${pessoa.nome}</strong>
            <button onclick="editarPessoa(${index})">Editar</button>
            <button onclick="deletarPessoa(${index})">Deletar</button>
        `;
        listaPessoas.appendChild(li);
    });
}

// Função para preencher os campos do formulário de edição
function editarPessoa(index) {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];
    const pessoa = pessoas[index];

    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('email').value = pessoa.email;
    document.getElementById('idade').value = pessoa.idade;
    document.getElementById('endereco').value = pessoa.endereco;
    document.getElementById('telefone').value = pessoa.telefone;
    document.getElementById('nascimento').value = pessoa.nascimento;
    document.getElementById('senha').value = pessoa.senha;

    indiceEdicao = index;
}

// Função para salvar as alterações feitas em uma pessoa
function salvarAlteracoes() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

    if (indiceEdicao !== null) {
        pessoas[indiceEdicao] = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            idade: document.getElementById('idade').value,
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            nascimento: document.getElementById('nascimento').value,
            senha: document.getElementById('senha').value
        };

        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        alert('Alterações salvas com sucesso!');
        preencherListaPessoas();
        limparFormulario();
        indiceEdicao = null;
    } else {
        alert('Nenhuma pessoa selecionada para edição.');
    }
}

// Função para deletar uma pessoa
function deletarPessoa(index) {
    const pessoas = JSON.parse(localStorage.getItem('pessoas')) || [];

    if (confirm('Tem certeza de que deseja excluir este cadastro?')) {
        pessoas.splice(index, 1);
        localStorage.setItem('pessoas', JSON.stringify(pessoas));
        preencherListaPessoas();
        limparFormulario();
        indiceEdicao = null;
    }
}

// Função para deletar a pessoa que está sendo editada
function deletarPessoaAtual() {
    if (indiceEdicao !== null) {
        deletarPessoa(indiceEdicao);
    } else {
        alert('Nenhuma pessoa selecionada para exclusão.');
    }
}

// Função para limpar o formulário após edição
function limparFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('endereco').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('nascimento').value = '';
    document.getElementById('senha').value = '';
}

// Função para voltar à página inicial
function voltarParaIndex() {
    window.location.href = 'index.html';
}

// Configurar eventos e inicializar dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    preencherListaPessoas();
    document.getElementById('salvar').addEventListener('click', salvarAlteracoes);
    document.getElementById('deletar').addEventListener('click', deletarPessoaAtual);
    document.getElementById('voltar').addEventListener('click', voltarParaIndex);
});
