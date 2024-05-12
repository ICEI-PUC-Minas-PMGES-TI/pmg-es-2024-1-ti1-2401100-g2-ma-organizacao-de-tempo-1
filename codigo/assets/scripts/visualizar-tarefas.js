const tarefaInput = document.querySelector("#tarefa");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const frequencia = document.querySelector("#frequencia");

function visualizarTarefa(){
    const id = sessionStorage.getItem("id");
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let tarefa = tarefas.find((acha) => {return acha.id == id;});

    tarefaInput.value += (tarefa.nome).charAt(0).toUpperCase() + tarefa.nome.slice(1);
    inicioInput.value += tarefa.inicioTarefa;
    finalInput.value += tarefa.finalTarefa;
    frequencia.value += (tarefa.frequencia).charAt(0).toUpperCase() + tarefa.frequencia.slice(1);
}

window.addEventListener("load", () => {
    visualizarTarefa();
});