document.addEventListener('DOMContentLoaded', () => {
    const userKey = 'loggedInUser';  // Chave do usuário autenticado

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

    function salvarAlteracoes() {
        const usuario = JSON.parse(localStorage.getItem(userKey));

        if (usuario) {
            usuario.username = document.getElementById('nome').value;
            usuario.email = document.getElementById('email').value;
            usuario.telefone = document.getElementById('telefone').value;
            usuario.nascimento = document.getElementById('nascimento').value;
            usuario.password = document.getElementById('senha').value;

            localStorage.setItem(userKey, JSON.stringify(usuario));
            updateUsuarios(usuario);

            alert('Alterações salvas com sucesso!');
        } else {
            alert('Nenhum usuário autenticado encontrado.');
        }
    }

    function deletarUsuario() {
        const usuario = JSON.parse(localStorage.getItem(userKey));

        if (usuario) {
            if (confirm('Tem certeza de que deseja excluir este cadastro?')) {
                localStorage.removeItem(userKey);
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios = usuarios.filter(user => user.id !== usuario.id);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                // Remover todos os dados relacionados ao usuário
                localStorage.removeItem('tarefas');
                localStorage.removeItem('cronoCoins');
                localStorage.removeItem('historico');

                alert('Usuário deletado com sucesso!');
                window.location.href = '../login/login.html';
            }
        } else {
            alert('Nenhum usuário autenticado encontrado.');
        }
    }

    function sair() {
        localStorage.removeItem(userKey);
        window.location.href = '../login/login.html';
    }

    function voltarParaIndex() {
        window.location.href = '../descricao/description.html';
    }

    function updateUsuarios(updatedUser) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.map(user => user.id === updatedUser.id ? updatedUser : user);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    document.getElementById('salvar').addEventListener('click', salvarAlteracoes);
    document.getElementById('deletar').addEventListener('click', deletarUsuario);
    document.getElementById('sair').addEventListener('click', sair);
    document.getElementById('voltar').addEventListener('click', voltarParaIndex);

    preencherDadosUsuario();
});
