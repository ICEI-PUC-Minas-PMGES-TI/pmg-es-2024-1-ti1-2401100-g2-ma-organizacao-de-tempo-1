//Codigo para gerar um calendario interiativo

const nomeMes = document.querySelector("#mes-titulo");
const datas = document.querySelector("#dates");
const botoesMes = document.querySelectorAll("#mes-anterior, #mes-seguinte");

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",];

let dia = new Date();
let mes = dia.getMonth();
let ano = dia.getFullYear();

function carregarCalendario(){
    //Define o primo dia do mes, o ultimo do mes, qual o ultimo dia do mes e o ultimo dia do mes anterior
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const ultimo = new Date(ano, mes, ultimoDia).getDay();
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
    
    //Criação dos dias do mes
    let dias = '';

    for(let i = primeiroDia; i > 0; i--){
        dias = dias + `<li class="inactive" style="list-style-type: none;">${ultimoDiaMesAnterior - i + 1}</li>`;
    }

    for (let j = 1; j <= ultimoDia; j++){
        let nomeId = j === dia.getDate && mes === new Date().getMonth() && ano == new Date().getFullYear() ? 'id="hoje"' : "";
        dias = dias + `<li${nomeId} style="list-style-type: none;">${j}</li>`;
    }

    for (let i = ultimo; i < 6; i++){
        dias = dias + `<li class="inactive" style="list-style-type: none;">${i - ultimo + 1}</li>`;
    }

    datas.innerHTML = dias;
    nomeMes.textContent = `${meses[mes]} ${ano}`;
}

//Mudar os meses ao clicar o botao de voltar ou avançar, mudando tbm os dias
botoesMes.forEach(nav => {
    nav.addEventListener('click', clique => {
        const botonId = clique.target.id;

        if (botonId === "mes-anterior" && mes === 0){
            ano--;
            mes = 11;
        } 
        else if (botonId === "mes-seguinte" && mes === 11){
            ano++;
            mes = 0;
        } 
        else{
            mes = (botonId === "mes-seguinte") ? mes + 1 : mes - 1;
        }

        dia = new Date(ano, mes, new Date().getDate());
        ano = dia.getFullYear();
        mes = dia.getMonth();

        carregarCalendario();
    });
});

carregarCalendario();

//CRUD Tarefas

const tbody = document.querySelector("tbody");

function carregarTabela(id, nome) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    for (let i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i];

        let tr = document.createElement("tr");
        tr.id = `tarefa-${tarefa.id}`;
        tr.classList.add("tarefa");

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

    botao.classList.add("btn", "px-3", "border-3", "fs-5", "d-flex", "flex-wrap","align-items-center", "justify-content-center", "text-white");
    

    return botao; 
}

function criarBotoesAcao() {
    const td = document.createElement("td");
    td.setAttribute("id", "botoes-crud");

    const editarButton = criarBotao("Editar");
    const excluirButton = criarBotao("Excluir");
    const visualizarBoton = criarBotao("Visualizar")

    editarButton.addEventListener("click", (e) => {
        const linha = e.target.parentElement.parentElement;
        const celulas = linha.childNodes;
        let id = parseInt(celulas[0].innerText);
        
        sessionStorage.setItem("id", id);

        window.location.href = "editar-tarefas.html";
    });

    excluirButton.addEventListener("click", (e) => {
        const linha = e.target.parentElement.parentElement;
        excluir(linha);
    });

    visualizarBoton.addEventListener("click", (e) =>{
        const linha = e.target.parentElement.parentElement;
        const celulas = linha.childNodes;
        let id = parseInt(celulas[0].innerText);

        sessionStorage.setItem("id", id);

        window.location.href = "visualizar-tarefas.html";
    });
    

    td.appendChild(editarButton);
    td.appendChild(excluirButton);
    td.appendChild(visualizarBoton);

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