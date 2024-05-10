const tbody = document.querySelector("tbody");

function carregarTabela(id, nome) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    for (let i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i];

        let tr = document.createElement("tr");
        tr.id = `tarefa-${tarefa.id}`;

        const celulas = ['id', 'nome'];

        for (let j = 0; j < celulas.length; j++) {
            const selecionados = celulas[j];
            const td = document.createElement("td");
            td.innerText = tarefa[selecionados];
            tr.appendChild(td);
        }

        let tdAcao = criarBotoesAcao();
        tr.appendChild(tdAcao);

        tbody.appendChild(tr);   
    }
}

function criarBotao(rotulo) {
    const botao = document.createElement("button");

    botao.type = "button";

    botao.innerText = rotulo;

    return botao; 
}

function criarBotoesAcao() {
    const td = document.createElement("td");

    const editarButton = criarBotao("Editar");
    const excluirButton = criarBotao("Excluir");

    editarButton.addEventListener("click", (event) => {

        const linha = event.target.parentElement.parentElement;
        const celulas = linha.childNodes;
        let id = parseInt(celulas[0].innerText);
        
        sessionStorage.setItem("id", id);

        window.location.href = "editar-tarefas.html";
    });

    excluirButton.addEventListener("click", (event) => {

        const linha = event.target.parentElement.parentElement;
        excluir(linha);

    });

    td.appendChild(editarButton);
    td.appendChild(excluirButton);

    return td;
}

function excluir(linha) {
    const celulas = linha.childNodes;

    let idTarefa = parseInt(celulas[0].innerText);

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    let indiceTarefaExcluido = buscarTarefa(idTarefa, tarefas);

    let confirmacao = confirm("Deseja excluir essa tarefa?");

    if (confirmacao) {
        tarefas.splice(indiceTarefaExcluido, 1);

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        linha.remove();
    }
}

function buscarTarefa(id, tarefas) {
    for (let i = 0; i < tarefas.length; i++) {  
        if (tarefas[i].id == id)
            return i;
    }
    return -1;
}

window.addEventListener("load", () => {
    carregarTabela();
});