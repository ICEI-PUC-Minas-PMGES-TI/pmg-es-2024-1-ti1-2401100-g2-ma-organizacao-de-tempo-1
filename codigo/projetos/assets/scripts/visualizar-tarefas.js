const tarefaInput = document.querySelector("#tarefa");
const data = document.querySelector("#data");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const frequencia = document.querySelector("#frequencia");
const prioridade = document.querySelector("#prioridade");

function visualizarTarefa(){
    const id = sessionStorage.getItem("id");
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find((acha) => {return acha.id == id;});

    tarefaInput.value += (tarefa.nome).charAt(0).toUpperCase() + tarefa.nome.slice(1);
    data.value += tarefa.data;
    prioridade.value += (tarefa.prioridade).charAt(0).toUpperCase() + tarefa.prioridade.slice(1);
    inicioInput.value += tarefa.inicioTarefa;
    finalInput.value += tarefa.finalTarefa;
    frequencia.value += (tarefa.frequencia).charAt(0).toUpperCase() + tarefa.frequencia.slice(1);
}

window.addEventListener("load", () => {
    visualizarTarefa();
});