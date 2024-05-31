document.getElementById('Form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const menssagem = document.getElementById('menssagem').value;

    // Obtém os dados armazenados ou inicializa um array vazio
    const data = JSON.parse(localStorage.getItem('formData')) || [];

    // Adiciona os novos dados ao array
    data.push({ nome, email, assunto, menssagem });

    // Armazena os dados no localStorage
    localStorage.setItem('formData', JSON.stringify(data));

    // Redireciona para a página de exibição
    window.location.href = 'contato.html';
});
