document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const nascimento = document.getElementById('nascimento').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;

        const novaPessoa = {
            nome,
            email,
            nascimento,
            telefone,
            senha
        };

        // Fetch existing users from user.json
        let pessoasCadastradas;
        try {
            const response = await fetch('/data/user.json');
            pessoasCadastradas = await response.json();
        } catch (error) {
            console.error('Erro ao carregar os dados existentes', error);
            pessoasCadastradas = [];
        }

        // Check if the email already exists
        const emailExists = pessoasCadastradas.some(pessoa => pessoa.email === email);

        if (emailExists) {
            alert('Já existe um cadastro com esse email.');
        } else {
            pessoasCadastradas.push(novaPessoa);

            // Save the updated list back to user.json
            try {
                await fetch('/data/user.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(pessoasCadastradas)
                });
                alert('Cadastro concluído com sucesso!');
                window.location.href = 'editar_usuario.html';
            } catch (error) {
                console.error('Erro ao salvar os dados', error);
                alert('Erro ao salvar os dados. Tente novamente.');
            }
        }
    });
});
