document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector("form");
    const tarefaInput = document.querySelector("#tarefa");
    const inicioInput = document.querySelector("#inicio");
    const finalInput = document.querySelector("#final");
    
    const urlParams = new URLSearchParams(window.location.search);
    const dataSelecionada = urlParams.get('date');
    
    function adicionarTarefa() {
        const horaInicio = inicioInput.value;
        const horaFinal = finalInput.value;

        if (horaInicio > horaFinal) {
            alert("A hora que você digitou não pode ser usada. Tente novamente!");
            form.reset();
            return;
        }

        const frequenciaSelecionada = document.querySelector('input[name="frequencia"]:checked');
        const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');

        if (tarefaInput.value.trim() === "" || !frequenciaSelecionada || !prioridadeSelecionada) {
            alert("Não foi digitado nenhum dado para salvar! Tente Novamente!");
            return;
        }

        let tarefa = {
            id: obterID(),
            nome: tarefaInput.value.trim(),
            data: dataSelecionada,
            inicioTarefa: inicioInput.value.trim(),
            finalTarefa: finalInput.value.trim(),
            frequencia: frequenciaSelecionada.value,
            prioridade: prioridadeSelecionada.value
        };

        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        form.reset();
        window.location.href = "calendario.html";
    }

    function obterID() {
        let id = parseInt(localStorage.getItem("id")) || 0;
        id += 1;
        localStorage.setItem("id", id);
        return id;
    }

    document.getElementById('botao-adicionar').addEventListener('click', adicionarTarefa);
});
