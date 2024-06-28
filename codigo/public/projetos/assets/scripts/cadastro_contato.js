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
    const menssagem = document.getElementById('menssagem').value;

    // Obtém os dados do usuário logado do localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user && user.id) {
        const userId = user.id;
        const contato = { nome, email, assunto, menssagem };

        // Envia os dados para o servidor
        fetch(`/data/user/${userId}/contato`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contato)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Redireciona para a página de exibição ou exibe uma mensagem de sucesso
                window.location.href = 'contato_user.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } else {
        console.error('Nenhum usuário logado encontrado no localStorage.');
    }
});
