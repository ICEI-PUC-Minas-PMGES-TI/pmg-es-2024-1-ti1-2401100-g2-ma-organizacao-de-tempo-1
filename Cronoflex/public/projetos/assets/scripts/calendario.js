document.addEventListener('DOMContentLoaded', function () {
    const userKey = 'loggedInUser';
    const usuario = JSON.parse(localStorage.getItem(userKey));

    if (!usuario) {
        alert('Nenhum usuário autenticado encontrado.');
        window.location.href = '../login/login.html';
        return;
    }

    const nomeMes = document.querySelector("#mes-titulo h2");
    const datas = document.querySelector("#dates");
    const botoesMes = document.querySelectorAll("#mes-anterior, #mes-seguinte");
    const prioridade = document.querySelector("#prio");
    const frequencia_diaria = document.querySelector("#freq_diaria");
    const frequencia_semanal = document.querySelector("#freq_semanal");
    const frequencia_mensal = document.querySelector("#freq_mensal");
    const limpar = document.querySelector("#limpar");

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let dia = new Date();
    let mes = dia.getMonth();
    let ano = dia.getFullYear();

    function carregarCalendario() {
        const primeiroDia = new Date(ano, mes, 1).getDay();
        const ultimoDia = new Date(ano, mes + 1, 0).getDate();
        const ultimo = new Date(ano, mes, ultimoDia).getDay();
        const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();

        let dias = '';

        for (let i = primeiroDia; i > 0; i--) {
            dias += `<li class="inactive">${ultimoDiaMesAnterior - i + 1}</li>`;
        }

        for (let j = 1; j <= ultimoDia; j++) {
            let nomeId = j === dia.getDate() && mes === new Date().getMonth() && ano == new Date().getFullYear() ? 'id="hoje"' : "";
            dias += `<li ${nomeId} class="active" data-date="${j}/${mes + 1}/${ano}">${j}</li>`;
        }

        for (let i = ultimo; i < 6; i++) {
            dias += `<li class="inactive">${i - ultimo + 1}</li>`;
        }

        datas.innerHTML = dias;
        nomeMes.textContent = `${meses[mes]} ${ano}`;

        document.querySelectorAll(".active").forEach(day => {
            day.addEventListener("mouseover", (e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                e.currentTarget.style.cursor = "pointer";
            });

            day.addEventListener("mouseout", (e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
            });

            day.addEventListener("click", (e) => {
                const dataSelecionada = e.currentTarget.getAttribute("data-date");
                window.location.href = `adicionar-tarefas.html?date=${dataSelecionada}`;
            });
        });
    }

    botoesMes.forEach(nav => {
        nav.addEventListener('click', clique => {
            const botonId = clique.target.id;

            if (botonId === "mes-anterior" && mes === 0) {
                ano--;
                mes = 11;
            }
            else if (botonId === "mes-seguinte" && mes === 11) {
                ano++;
                mes = 0;
            }
            else {
                mes = (botonId === "mes-seguinte") ? mes + 1 : mes - 1;
            }

            dia = new Date(ano, mes, new Date().getDate());
            ano = dia.getFullYear();
            mes = dia.getMonth();

            carregarCalendario();
        });
    });

    function carregarTabela(id, nome) {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = '';
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        if (tarefas.length === 0) {
            alert("Para cadastrar uma tarefa, clique no dia que deseja cadastrar");
        }

        let filtroSelecionado = document.querySelector('input[name="filtro"]:checked');
        if (filtroSelecionado) {
            if (filtroSelecionado.id === "prio") {
                tarefas = tarefas.filter(tarefa => tarefa.prioridade === "alta");
            } else if (filtroSelecionado.id === "freq_diaria") {
                tarefas = tarefas.filter(tarefa => tarefa.frequencia === "diaria");
            } else if (filtroSelecionado.id === "freq_semanal") {
                tarefas = tarefas.filter(tarefa => tarefa.frequencia === "semanal");
            } else if (filtroSelecionado.id === "freq_mensal") {
                tarefas = tarefas.filter(tarefa => tarefa.frequencia === "mensal");
            }
        }

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

            if (tarefa.concluida) {
                tr.classList.add("concluida");
            }
        }
    }

    function criarBotao(rotulo) {
        const botao = document.createElement("button");

        botao.type = "button";

        botao.innerText = rotulo;

        botao.classList.add("btn", "px-3", "border-3", "fs-5", "d-flex", "flex-wrap", "align-items-center", "justify-content-center", "text-white");

        return botao;
    }

    function criarBotoesAcao() {
        const td = document.createElement("td");
        td.setAttribute("id", "botoes-crud");

        const editarButton = criarBotao("Editar");
        const excluirButton = criarBotao("Excluir");
        const visualizarBoton = criarBotao("Visualizar");
        const concluidoBoton = criarBotao("Concluir");

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

        visualizarBoton.addEventListener("click", (e) => {
            const linha = e.target.parentElement.parentElement;
            const celulas = linha.childNodes;
            let id = parseInt(celulas[0].innerText);

            sessionStorage.setItem("id", id);

            window.location.href = "visualizar-tarefas.html";
        });

        concluidoBoton.addEventListener("click", (e) => {
            const linha = e.target.parentElement.parentElement;
            concluirTarefa(linha);
        });

        td.appendChild(editarButton);
        td.appendChild(excluirButton);
        td.appendChild(visualizarBoton);
        td.appendChild(concluidoBoton);

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

    function concluirTarefa(linha) {
        const celulas = linha.childNodes;
        let idTarefa = parseInt(celulas[0].innerText);
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        let indiceTarefa = buscarTarefa(idTarefa, tarefas);

        tarefas[indiceTarefa].concluida = !tarefas[indiceTarefa].concluida;

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        if (tarefas[indiceTarefa].concluida) {
            linha.classList.add("concluida");
            const prioridade = tarefas[indiceTarefa].prioridade;
            adicionarHistorico('conclusão', prioridade, prioridade === 'alta' ? 60 : 10);
        } else {
            linha.classList.remove("concluida");
        }
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

    function buscarTarefa(id, tarefas) {
        for (let i = 0; i < tarefas.length; i++) {
            if (tarefas[i].id == id)
                return i;
        }
        return -1;
    }

    const filtros = [prioridade, frequencia_diaria, frequencia_semanal, frequencia_mensal];
    filtros.forEach(filtro => {
        filtro.addEventListener('change', () => {
            carregarTabela();
        });
    });

    limpar.addEventListener('click', () => {
        let filtroSelecionado = document.querySelector('input[name="filtro"]:checked');
        if (filtroSelecionado) filtroSelecionado.checked = false;
        carregarTabela();
    });

    carregarCalendario();
    carregarTabela();
});
