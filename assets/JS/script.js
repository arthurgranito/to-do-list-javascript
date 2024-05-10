const button = document.querySelector(".btn-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-task");

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  });
  input.value = "";
  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
    <li class="task ${item.concluida && "done"}">
        <img src="assets/img/checked.png" alt="Checked" onclick="concluirTarefa(${posicao})"/>
        <p>${item.tarefa}</p>
        <img src="assets/img/trash.png" alt="Trash" onclick="deletarItem(${posicao})"/>
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;

  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);

  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();

button.addEventListener("click", adicionarNovaTarefa);
