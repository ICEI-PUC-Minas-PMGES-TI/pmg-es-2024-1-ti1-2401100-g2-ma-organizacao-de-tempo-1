const form = document.querySelector("form");
const tarefaInput = document.querySelector("#tarefa");
const inicioInput = document.querySelector("#inicio");
const finalInput = document.querySelector("#final");
const diarioInput = document.querySelector("#diaria");
const semanalInput = document.querySelector("#semanal");
const mensalInput = document.querySelector("#mensal");


function adicionarTarefa(){
    const dataInicio = new Date(inicioInput.value);
    const dataFinal = new Date(finalInput.value);

    if(dataInicio > dataFinal){
        alert("A data que voce digitou não pode ser usada. Tente Novamente!");
        form.reset();
    }

    else if(tarefaInput.value.trim().length === 0 && inicioInput.value.trim().length === 0 && finalInput.value.trim().length === 0 && diarioInput.value.trim().length === 0 && mensalInput.value.trim().length === 0 && semanalInput.value.trim().length === 0) {
        alert("Não foi digitado nenhum dado para salvar! Tente Novamente!");
        form.reset();
        return;
    }    

    else{
        let tarefa = {
            id: obterID(),
            nome: tarefaInput.value.trim(),
            inicioTarefa: inicioInput.value.trim(),
            finalTarefa: finalInput.value.trim(),
            frequencia: diarioInput.value.trim() || semanalInput.value.trim() || mensalInput.value.trim()
        };
    
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        tarefas.push(tarefa);
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    
        form.reset();
        window.location.href = "calendario.html";
    }
}


function obterID() {
    let id = parseInt(localStorage.getItem("id")) || 0;
   
    id += 1;
    
    localStorage.setItem("id", id);

    return id;
}