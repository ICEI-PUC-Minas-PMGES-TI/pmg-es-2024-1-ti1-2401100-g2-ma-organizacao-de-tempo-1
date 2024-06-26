document.getElementById('showPassword').addEventListener('change', function() {
    var passwordInput = document.getElementById('senha');
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});
