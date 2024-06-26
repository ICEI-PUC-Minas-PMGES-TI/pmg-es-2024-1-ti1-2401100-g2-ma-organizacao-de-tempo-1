const tarefaInput = document.querySelector("#tarefa");
const dataInput = document.querySelector("#data");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const frequenciaInput = document.querySelector("#frequencia");
const prioridadeInput = document.querySelector("#prioridade");

function visualizarTarefa(){
    const id = sessionStorage.getItem("id");
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find((acha) => {return acha.id == id;});

    tarefaInput.value = (tarefa.nome).charAt(0).toUpperCase() + tarefa.nome.slice(1);
    dataInput.value = tarefa.data;
    inicioInput.value = tarefa.inicioTarefa;
    finalInput.value = tarefa.finalTarefa;
    frequenciaInput.value = (tarefa.frequencia).charAt(0).toUpperCase() + tarefa.frequencia.slice(1);
    prioridadeInput.value = (tarefa.prioridade).charAt(0).toUpperCase() + tarefa.prioridade.slice(1);
}

window.addEventListener("load", () => {
    visualizarTarefa();
});
