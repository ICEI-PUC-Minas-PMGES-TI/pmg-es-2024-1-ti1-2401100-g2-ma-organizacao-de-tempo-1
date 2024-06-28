document.getElementById('showPassword').addEventListener('change', function () {
    var passwordInput = document.getElementById('senha');
    passwordInput.type = this.checked ? 'text' : 'password';
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('usuario').value;
    var password = document.getElementById('senha').value;

    console.log('Tentando fazer login com:', username, password);

    // Autenticar usuário
    fetch('/data/user/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Usuário ou senha incorretos.');
                } else {
                    throw new Error('Erro ao tentar fazer login.');
                }
            }
            return response.json();
        })
        .then(authenticatedUser => {
            console.log('Usuário autenticado:', authenticatedUser);
            localStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
            window.location.href = '../descricao/description.html';
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            displayErrorPopup(error.message);
        });
});

function displayErrorPopup(errorMessage) {
    var popup = document.getElementById('popup');
    var popupContent = document.getElementById('popup-content');
    var closePopup = document.getElementById('close-popup');
    var errorMessageElement = document.getElementById('errorMessage');

    errorMessageElement.textContent = errorMessage;
    popup.style.display = 'flex';

    closePopup.onclick = function () {
        popup.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };
}
