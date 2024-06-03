document.addEventListener('DOMContentLoaded', function(){
    const tarefasJson = [
        { "nome": "atividades", "dia": "hoje", "resultado": "pendente", "horario": "20:00"},
        { "nome": "estudar", "dia": "hoje", "resultado": "concluiu", "horario": "17:00"},
        { "nome": "trabalhar", "dia": "hoje", "resultado": "não concluiu", "horario": "12:00" },
        { "nome": "cochilar", "dia": "ontem", "resultado": "não concluiu", "horario": "16:00" },
        { "nome": "pesquisa", "dia": "ontem", "resultado": "não concluiu", "horario": "10:00" },
        { "nome": "atividades", "dia": "ontem", "resultado": "concluiu", "horario": "09:00" }
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
                icones.src = '../codigo/assets/images/time_8357174.png';
            break;

            case 'concluiu':
                icones.src = '../codigo/assets/images/check_1828743.png';
            break;

            case 'não concluiu':
                icones.src = '../codigo/assets/images/close_2976286.png';
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