let cronoCoins = JSON.parse(localStorage.getItem('cronoCoins')) || 100;

    function atualizarSaldo() {
      // Atualizando o saldo de CronoCoins na div
      document.getElementById('saldocoins').innerText = `${cronoCoins}`;
      // Armazenando o saldo de CronoCoins no localStorage
      localStorage.setItem('cronoCoins', JSON.stringify(cronoCoins));
    }

    function recompensarTarefaConcluida() {
      const recompensa = 10;
      cronoCoins += recompensa;
      atualizarSaldo();
    }

    function recompensarIndicacao() {
      const recompensaIndicacao = 50;
      cronoCoins += recompensaIndicacao;
      atualizarSaldo();
    }

    function verificarConsistencia() {
      const concluiuPor7Dias = true;
      if (concluiuPor7Dias) {
        const recompensaConsistencia = 100;
        cronoCoins += recompensaConsistencia;
        atualizarSaldo();
      }
    }

    recompensarTarefaConcluida();
    recompensarIndicacao();
    verificarConsistencia();