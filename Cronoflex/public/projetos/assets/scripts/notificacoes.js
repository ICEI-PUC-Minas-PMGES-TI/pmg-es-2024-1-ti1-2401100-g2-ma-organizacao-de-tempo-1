document.addEventListener('DOMContentLoaded', function(){
    const tarefasJson = [
        { "id": 1, "nome": "atividades", "dia": "hoje", "resultado": "pendente", "horario": "20:00", "concluida": false},
        { "id": 2, "nome": "estudar", "dia": "hoje", "resultado": "concluiu", "horario": "17:00", "concluida": true},
        { "id": 3, "nome": "trabalhar", "dia": "hoje", "resultado": "não concluiu", "horario": "12:00", "concluida": false },
        { "id": 4, "nome": "cochilar", "dia": "ontem", "resultado": "não concluiu", "horario": "16:00", "concluida": false },
        { "id": 5, "nome": "pesquisa", "dia": "ontem", "resultado": "não concluiu", "horario": "10:00", "concluida": false },
        { "id": 6, "nome": "atividades", "dia": "ontem", "resultado": "concluiu", "horario": "09:00", "concluida": true }
    ]

if(!localStorage.getItem('tarefas')){
    localStorage.setItem('tarefas', JSON.stringify(tarefasJson));
}

const tarefas = JSON.parse(localStorage.getItem('tarefas'));
gerarNotificacoes(tarefas);

});

function gerarNotificacoes(tarefas){
    const hoje = new Date();
    const ontem = new Date();
    ontem.setDate(hoje.getDate() - 1);

    tarefas.forEach(tarefa => {
       
        let caixa = document.createElement('div');
        caixa.className = 'boxnotificacao';


        let icones = document.createElement('img');

        switch(tarefa.resultado){
            
            case 'pendente':
                icones.src = '../../assets/images/time_8357174.png';
            break;

            case 'concluiu':
                icones.src = '../../assets/images/check_1828743.png';
            break;

            case 'não concluiu':
                icones.src = '../../assets/images/close_2976286.png';
            break;
        }

        let paragrafo = document.createElement('p');
        if (tarefa.resultado === 'pendente') {
            paragrafo.textContent = `Está na hora de fazer a ${tarefa.nome}`;
        } else {
            paragrafo.textContent = `Você ${tarefa.resultado} a ${tarefa.nome}`;
        }
        
        let horarios = document.createElement('span');
        
        horarios.className = 'horariotarefa';
        horarios.textContent = tarefa.horario;

        caixa.appendChild(icones);
        caixa.appendChild(paragrafo);
        caixa.appendChild(horarios);

        if(tarefa.dia === 'hoje'){
            document.getElementById('nhoje').appendChild(caixa);
        }else if(tarefa.dia === 'ontem'){
            document.getElementById('nontem').appendChild(caixa);
        }else{

            let data = document.createElement('h2');
            data.textContent = tarefa.dia;

            let divdata = document.createElement('div');
            divdata.appendChild(data);
            divdata.appendChild(caixa);

            document.getElementById('noutros').appendChild(divdata);
        }
    });
}

function concluirtarefa(linha){
    const celulas = linha.childNodes;
    let idTarefa = parseInt(celulas[0].innerText);
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    let indiceTarefa = buscarTarefa(idTarefa, tarefas);

    tarefas[indiceTarefa].concluida = !tarefas[indiceTarefa].concluida;
    tarefas[indiceTarefa].resultado = tarefas[indiceTarefa].concluida ? 'concluiu' : 'não concluiu';

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    window.location.reload();
}

function buscarTarefa(id, tarefas){
    return tarefas.findIndex(tarefa => tarefa.id === id);
}