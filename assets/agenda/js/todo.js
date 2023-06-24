// Implementação da to-do list
// Criação do array (lista) vazio
let banco = [];

// Utiliza o método parse para ler os dados em JSON em uma arrow function
const getBanco = () => JSON.parse(localStorage.getItem('lista')) ?? [];

/* Insere o item no armazenamento do navegador, convertendo os valores em Javascript
para uma string em JSON
*/
const setBanco = (banco) => localStorage.setItem('lista', JSON.stringify(banco));

// Arrow function para criar o item digitado, passando três parâmetros e injetando HTML na página
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('agenda_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <section>${tarefa}</section>
        <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('lista').appendChild(item);
}

const limparTarefas = () => {
    const lista = document.getElementById('lista');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco(); 
    banco.forEach ( (item, indice) => criarItem (item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter' && texto != ''){
        const banco = getBanco();
        banco.push ({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice (indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    console.log (elemento.type);
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem (indice);
    }else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem (indice);
    }
}

document.getElementById('novoItem').addEventListener('keypress', inserirItem);
document.getElementById('lista').addEventListener('click', clickItem);

atualizarTela();