document.addEventListener('DOMContentLoaded', function () {
  const userKey = 'loggedInUser';
  const usuario = JSON.parse(localStorage.getItem(userKey));

  if (!usuario) {
    alert('Nenhum usuário autenticado encontrado.');
    window.location.href = '../login/login.html';
    return;
  }

  let cronoCoins = JSON.parse(localStorage.getItem('cronoCoins')) || 100;

  function atualizarSaldo() {
    document.getElementById('saldocoins').innerText = `${cronoCoins}`;
    localStorage.setItem('cronoCoins', JSON.stringify(cronoCoins));
  }

  function recompensarTarefaConcluida(prioridade) {
    const recompensa = prioridade === 'alta' ? 60 : 10;
    cronoCoins += recompensa;
    atualizarSaldo();
    adicionarHistorico('conclusão', prioridade, recompensa);
  }

  function penalizarTarefaNaoConcluida(prioridade) {
    const penalidade = prioridade === 'alta' ? 60 : 10;
    cronoCoins -= penalidade;
    atualizarSaldo();
    adicionarHistorico('não conclusão', prioridade, -penalidade);
  }

  function adicionarHistorico(tipo, prioridade, valor) {
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    const data = new Date().toLocaleString();
    const entrada = {
      tipo,
      prioridade,
      valor,
      data
    };
    historico.push(entrada);
    localStorage.setItem('historico', JSON.stringify(historico));
  }

  function carregarHistorico() {
    const historicoTableBody = document.getElementById('historico-table-body');
    let historico = JSON.parse(localStorage.getItem('historico')) || [];

    historicoTableBody.innerHTML = ''; // Limpa o conteúdo da tabela

    historico.forEach(entry => {
      const row = document.createElement('tr');
      row.innerHTML = `
              <td>${entry.tipo}</td>
              <td>${entry.prioridade}</td>
              <td>${entry.valor}</td>
              <td>${entry.data}</td>
          `;
      historicoTableBody.appendChild(row);
    });
  }

  function verificarConsistencia() {
    const concluiuPor7Dias = true; // Aqui você deve implementar a lógica para verificar a consistência
    if (concluiuPor7Dias) {
      const recompensaConsistencia = 100;
      cronoCoins += recompensaConsistencia;
      atualizarSaldo();
      adicionarHistorico('consistência', 'alta', recompensaConsistencia);
    }
  }

  atualizarSaldo();
  carregarHistorico();
});
