//Criando o cliente
const cliente = {
  id: 1,
  nome: "ClienteTeste",
  nascimento: "2000-01-01",
  email: "clienteo@gmail.com",
  idade: "24",
  telefone: "31999999999",
  senha: "12345678",
  tarefas: ["Estudar - 20:30", "Dormir - 22:30"],
};

//Passa o Json para O LocalStorage
const jsonString = JSON.stringify(cliente);
console.log("JSON feito");

//Enviando para o LocalStorage
localStorage.setItem("cliente", jsonString);
console.log("JSON enviado");

//Recuperando do LocalStorage
const storedJsonCliente = localStorage.getItem("cliente");

//Transformando em Objeto novamente
const JsonCliente = JSON.parse(storedJsonCliente);

let captureElement = document.getElementById("CronoContent");
let choresList = document.createElement('ul');

function createButton() {
  var button = document.getElementById("SeeChores");

  if (!button) {
    button = document.createElement("button");
    button.id = "SeeChores";
    button.innerHTML = "Ver Tarefas";
    button.onclick = function () {
      JsonCliente.tarefas.forEach(tarefa => {
        const listItem = document.createElement('li');
        listItem.textContent = tarefa;
        choresList.appendChild(listItem);
      });
      captureElement.appendChild(choresList);
      captureElement.removeChild(button);
      
      const changeMainButton = document.getElementById("botaoPopup");
      changeMainButton.onclick = function () {
        alert("Teste finalizado");
      }
    };
    captureElement.appendChild(button);
  } else {
    alert("Elemento já criado");
  }
}

function changeContent() {
  const content = document.getElementById("Content");
  const text = `Olá ${JsonCliente.nome}\n Para ver suas tarefas, clique no botão abaixo.`;

  content.innerText = text;

  createButton();
}