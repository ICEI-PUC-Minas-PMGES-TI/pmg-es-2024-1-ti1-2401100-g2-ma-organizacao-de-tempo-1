document.getElementById('showPassword').addEventListener('change', function () {
    var passwordInput = document.getElementById('senha');
    passwordInput.type = this.checked ? 'text' : 'password';
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('usuario').value;
    var password = document.getElementById('senha').value;

    console.log('Tentando fazer login com:', username, password);

    // Autenticar usuário a partir do Local Storage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioAutenticado = usuarios.find(user =>
        (user.username === username || user.email === username) && user.password === password);

    if (usuarioAutenticado) {
        console.log('Usuário autenticado:', usuarioAutenticado);
        localStorage.setItem('loggedInUser', JSON.stringify(usuarioAutenticado));
        window.location.href = '../descricao/description.html';
    } else {
        console.error('Usuário ou senha incorretos.');
        displayErrorPopup('Usuário ou senha incorretos.');
    }
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
