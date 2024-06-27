document.getElementById('showPassword').addEventListener('change', function () {
    var passwordInput = document.getElementById('senha');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('usuario').value;
    var password = document.getElementById('senha').value;

    console.log('Tentando fazer login com:', username, password);

    fetch('/data/user.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados carregados:', data);
            var users = data.users;

            var authenticatedUser = users.find(function (user) {
                return (user.username === username || user.email === username) && user.password === password;
            });

            if (authenticatedUser) {
                console.log('Usuário autenticado:', authenticatedUser);
                window.location.href = '../descricao/description.html';
            } else {
                console.log('Usuário ou senha incorretos.');
                displayErrorPopup('Usuário ou senha incorretos.');
            }
        })
        .catch(error => {
            console.error('Erro na requisição JSON:', error);
            displayErrorPopup('Erro ao tentar fazer login.');
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
