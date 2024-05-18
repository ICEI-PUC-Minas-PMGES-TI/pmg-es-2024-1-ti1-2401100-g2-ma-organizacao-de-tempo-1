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


function atualizarCliente(event) {
event.preventDefault();  // Previne o comportamento padrão do formulário

// Atualizando o campo nome do objeto JsonCliente com o valor do input
JsonCliente.nome = inputNome.value;


// Salvando o objeto atualizado no LocalStorage
localStorage.setItem("cliente", JSON.stringify(JsonCliente));

// Atualizando o campo de nome exibido no perfil
mostrarNome.textContent = JsonCliente.nome;

console.log("JSON atualizado e salvo");
}
// Adicionando o evento de submit ao formulário
document.getElementById("formAlterarDados").addEventListener("submit", atualizarCliente);


let mostrarPerfil = document.querySelector("#perfil");
let mostrarNome = document.querySelector("#PerfilNome");
let mostrarEmail = document.querySelector("#PerfilEmail");
let mostrarIdade = document.querySelector("#PerfilIdade");
let mostrarTelefone = document.querySelector("#PerfilTelefone");
let mostrarDataDeNascimento = document.querySelector("#PerfilDataDeNascimento");
let inputNome = document.querySelector("#testeInput");
inputNome.value = JsonCliente.nome;

mostrarNome.textContent = JsonCliente.nome;
mostrarEmail.textContent = JsonCliente.email;
mostrarIdade.textContent = JsonCliente.idade;
mostrarTelefone.textContent = JsonCliente.telefone;
mostrarDataDeNascimento.textContent = JsonCliente.nascimento;