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

let mostrarPerfil = document.querySelector("#perfil");
let mostrarNome = document.querySelector("#PerfilNome");
let mostrarEmail = document.querySelector("#PerfilEmail");
let mostrarIdade = document.querySelector("#PerfilIdade");
let mostrarTelefone = document.querySelector("#PerfilTelefone");
let mostrarDataDeNascimento = document.querySelector("#PerfilDataDeNascimento");

mostrarNome.textContent = JsonCliente.nome;
mostrarEmail.textContent = JsonCliente.email;
mostrarIdade.textContent = JsonCliente.idade;
mostrarTelefone.textContent = JsonCliente.telefone;
mostrarDataDeNascimento.textContent = JsonCliente.nascimento;