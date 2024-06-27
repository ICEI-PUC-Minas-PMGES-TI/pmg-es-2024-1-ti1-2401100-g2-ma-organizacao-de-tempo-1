document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('Form');
    const telefoneInput = document.getElementById('telefone');
    const mostrarSenhasCheckbox = document.getElementById('mostrarSenhas');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');

    function applyPhoneMask(event) {
        let input = event.target;
        input.value = input.value.replace(/\D/g, '');
        input.value = input.value.replace(/^(\d{2})(\d)/, '($1) $2');
        input.value = input.value.replace(/(\d)(\d{4})$/, '$1-$2');
    }

    function togglePasswordVisibility() {
        const type = mostrarSenhasCheckbox.checked ? 'text' : 'password';
        senhaInput.type = type;
        confirmarSenhaInput.type = type;
    }

    telefoneInput.addEventListener('input', applyPhoneMask);
    mostrarSenhasCheckbox.addEventListener('change', togglePasswordVisibility);

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const nascimento = document.getElementById('nascimento').value;
        const telefone = document.getElementById('telefone').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const novaPessoa = {
            id: Date.now(),
            username: nome,
            email,
            password: senha,
            telefone: telefone,
            nascimento: nascimento
        };

        try {
            const response = await fetch('/data/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaPessoa)
            });

            if (response.ok) {
                alert('Cadastro concluído com sucesso!');
                window.location.href = '../login/login.html';
            } else {
                throw new Error('Erro ao salvar os dados');
            }
        } catch (error) {
            console.error('Erro ao salvar os dados', error);
            alert('Erro ao salvar os dados. Tente novamente.');
        }
    });
});
