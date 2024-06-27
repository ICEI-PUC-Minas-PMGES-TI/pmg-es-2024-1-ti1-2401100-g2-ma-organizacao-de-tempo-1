let indiceEdicao = null;
const userKey = 'authenticatedUser';

// Função para preencher o formulário com os dados do usuário autenticado
function preencherDadosUsuario() {
    const usuario = JSON.parse(localStorage.getItem(userKey));

    if (usuario) {
        document.getElementById('nome').value = usuario.username;
        document.getElementById('email').value = usuario.email;
        document.getElementById('idade').value = calcularIdade(usuario.nascimento);
        document.getElementById('telefone').value = usuario.telefone;
        document.getElementById('nascimento').value = usuario.nascimento;
        document.getElementById('senha').value = usuario.password;
    } else {
        alert('Nenhum usuário autenticado encontrado.');
    }
}

// Função para calcular a idade a partir da data de nascimento
function calcularIdade(nascimento) {
    const hoje = new Date();
    const dataNascimento = new Date(nascimento);
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    return idade;
}

// Função para salvar as alterações feitas no usuário autenticado
function salvarAlteracoes() {
    const usuario = JSON.parse(localStorage.getItem(userKey));

    if (usuario) {
        usuario.username = document.getElementById('nome').value;
        usuario.email = document.getElementById('email').value;
        usuario.telefone = document.getElementById('telefone').value;
        usuario.nascimento = document.getElementById('nascimento').value;
        usuario.password = document.getElementById('senha').value;

        localStorage.setItem(userKey, JSON.stringify(usuario));

        // Atualizar no servidor
        fetch('/data/user.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                alert('Alterações salvas com sucesso!');
            })
            .catch(error => {
                console.error('Erro ao salvar alterações:', error);
                alert('Erro ao salvar alterações.');
            });
    } else {
        alert('Nenhum usuário autenticado encontrado.');
    }
}

// Função para deletar o usuário autenticado
function deletarUsuario() {
    const usuario = JSON.parse(localStorage.getItem(userKey));

    if (usuario) {
        if (confirm('Tem certeza de que deseja excluir este cadastro?')) {
            fetch(`/data/user/${usuario.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    localStorage.removeItem(userKey);
                    alert('Usuário deletado com sucesso!');
                    window.location.href = '../login/login.html';
                })
                .catch(error => {
                    console.error('Erro ao deletar usuário:', error);
                    alert('Erro ao deletar usuário.');
                });
        }
    } else {
        alert('Nenhum usuário autenticado encontrado.');
    }
}

// Função para voltar à página descrição
function voltarParaIndex() {
    window.location.href = '../descricao/description.html';
}

// Configurar eventos e inicializar dados ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    preencherDadosUsuario();
    document.getElementById('salvar').addEventListener('click', salvarAlteracoes);
    document.getElementById('deletar').addEventListener('click', deletarUsuario);
    document.getElementById('voltar').addEventListener('click', voltarParaIndex);
});
