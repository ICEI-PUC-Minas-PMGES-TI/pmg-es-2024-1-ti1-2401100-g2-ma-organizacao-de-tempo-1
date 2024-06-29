document.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        document.getElementById('nome').value = user.username || '';
        document.getElementById('email').value = user.email || '';
    } else {
        console.error('Nenhum usuário logado encontrado no localStorage.');
    }
});

document.getElementById('Form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Obtém os dados do usuário logado do localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user && user.id) {
        const userId = user.id;
        const contato = { nome, email, assunto, mensagem };

        // Adiciona o contato ao usuário logado
        user.contatos = user.contatos || [];
        user.contatos.push(contato);
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        // Atualiza a lista de usuários
        updateUsuarios(user);

        alert('Contato cadastrado com sucesso!');
        window.location.href = 'contato_user.html';
    } else {
        console.error('Nenhum usuário logado encontrado no localStorage.');
    }
});

function updateUsuarios(updatedUser) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios = usuarios.map(user => user.id === updatedUser.id ? updatedUser : user);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
