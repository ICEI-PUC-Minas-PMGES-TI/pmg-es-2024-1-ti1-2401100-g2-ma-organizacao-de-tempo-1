let tarefas = [];
let tarefa = [];

const form = document.querySelector("form");
const tarefaInput = document.querySelector("#tarefa");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const diarioInput = document.querySelector("#diaria");
const semanalInput = document.querySelector("#semanal");
const mensalInput = document.querySelector("#mensal");
const dataInput = document.querySelector("#data");
const baixaInput = document.querySelector("#baixa");
const mediaInput = document.querySelector("#media");
const altaInput = document.querySelector("#alta");

function carregarDados(){
    const id = sessionStorage.getItem("id");

    tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    tarefa = tarefas.find((x) =>{
        return x.id == id;
    });

    tarefaInput.value = tarefa.nome;
    dataInput.value = tarefa.data;
    inicioInput.value = tarefa.inicioTarefa;
    finalInput.value = tarefa.finalTarefa;
    diarioInput.value || semanalInput.value || mensalInput.value == tarefa.frequencia;
    baixaInput.value || mediaInput.value || altaInput.value == tarefa.prioridade;
}

function buscarTarefa(id) {
    for (let i = 0; i < tarefas.length; i++) {  
        if (tarefas[i].id == id)
            return i;
    }
    return -1;
}

function atualizarTarefa(){
    tarefa.nome = tarefaInput.value.trim();
    tarefa.data = dataInput.value.trim();
    tarefa.inicioTarefa = inicioInput.value.trim();
    tarefa.finalTarefa = finalInput.value.trim();
    tarefa.frequencia = diarioInput.value.trim() || semanalInput.value.trim() || mensalInput.value.trim();
    tarefa.prioridade = baixaInput.value.trim() || mediaInput.value.trim() || altaInput.value.trim();
    const horaInicio = tarefa.inicioTarefa;
    const horaFinal = tarefa.finalTarefa;

    if(horaInicio > horaFinal){
        alert("A hora que voce digitou não pode ser usada. Tente Novamente!");
        form.reset();
    }
    else{
        let ind = buscarTarefa(tarefa.id);

        tarefas[ind] = tarefa;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        form.reset();
        window.location.href = "calendario.html";
    } 
}

window.addEventListener("load", () => {
    carregarDados();
});



