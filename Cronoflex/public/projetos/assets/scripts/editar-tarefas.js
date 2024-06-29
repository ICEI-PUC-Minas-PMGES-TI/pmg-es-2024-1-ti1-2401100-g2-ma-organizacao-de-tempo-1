let tarefas = [];
let tarefa = {};

const form = document.querySelector("form");
const tarefaInput = document.querySelector("#tarefa");
const dataInput = document.querySelector("#data");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const diarioInput = document.querySelector("#diaria");
const semanalInput = document.querySelector("#semanal");
const mensalInput = document.querySelector("#mensal");
const baixaInput = document.querySelector("#baixa");
const altaInput = document.querySelector("#alta");

function carregarDados() {
    const id = sessionStorage.getItem("id");

    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefa = tarefas.find((x) => {
        return x.id == id;
    });

    tarefaInput.value = tarefa.nome;
    dataInput.value = tarefa.data;
    inicioInput.value = tarefa.inicioTarefa;
    finalInput.value = tarefa.finalTarefa;

    if (tarefa.frequencia === "diaria") {
        diarioInput.checked = true;
    } else if (tarefa.frequencia === "semanal") {
        semanalInput.checked = true;
    } else if (tarefa.frequencia === "mensal") {
        mensalInput.checked = true;
    }

    if (tarefa.prioridade === "baixa") {
        baixaInput.checked = true;
    } else if (tarefa.prioridade === "alta") {
        altaInput.checked = true;
    }
}

function buscarTarefa(id) {
    for (let i = 0; i < tarefas.length; i++) {
        if (tarefas[i].id == id)
            return i;
    }
    return -1;
}

function atualizarTarefa() {
    tarefa.nome = tarefaInput.value.trim();
    tarefa.data = dataInput.value.trim();
    tarefa.inicioTarefa = inicioInput.value.trim();
    tarefa.finalTarefa = finalInput.value.trim();
    tarefa.frequencia = document.querySelector('input[name="frequencia"]:checked').value;
    tarefa.prioridade = document.querySelector('input[name="prioridade"]:checked').value;

    const horaInicio = tarefa.inicioTarefa;
    const horaFinal = tarefa.finalTarefa;

    if (horaInicio > horaFinal) {
        alert("A hora que você digitou não pode ser usada. Tente Novamente!");
        return;
    }

    let ind = buscarTarefa(tarefa.id);

    tarefas[ind] = tarefa;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    form.reset();
    window.location.href = "calendario.html";
}

window.addEventListener("load", () => {
    carregarDados();
});
