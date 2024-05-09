document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Captura dos campos
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('idade').value;
        const endereco = document.getElementById('endereco').value;
        const telefone = document.getElementById('telefone').value;
        const nascimento = document.getElementById('nascimento').value;
        const senha = document.getElementById('senha').value;

        // Criação de um objeto para a pessoa cadastrada
        const novaPessoa = {
            nome,
            email,
            idade,
            endereco,
            telefone,
            nascimento,
            senha
        };

        // Obtendo o array de pessoas já cadastradas
        const pessoasCadastradas = JSON.parse(localStorage.getItem('pessoas')) || [];

        // Adicionando a nova pessoa ao array
        pessoasCadastradas.push(novaPessoa);

        // Armazenando novamente o array atualizado no localStorage
        localStorage.setItem('pessoas', JSON.stringify(pessoasCadastradas));

        // Alerta de sucesso e redirecionamento
        alert('Cadastro concluído com sucesso!');
        window.location.href = 'editarDados.html';
    });
});
