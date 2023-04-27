const formulario = document.getElementById('novoItem');
const lista = document.getElementById('lista');

//Itens controla a lista de itens que será enviada ao LocalStorage
const itens = JSON.parse(localStorage.getItem("itens")) || [];

//cria os elementos à partir da array existente
itens.forEach(elemento => {
    criaElemento(elemento);
});

formulario.addEventListener('submit', (evento) => {
    //previne o comportamento padrão do evento submit
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    
    const itemAtual = {
        nome: nome.value,
        quantidade: quantidade.value
    };

    //procura o elemento pelo nome e retorna o objeto caso ele exista
    const elementoEncontrado = itens.find(elemento => elemento.nome === nome.value);

    if (!elementoEncontrado) {
        //cria um novo elemento caso não exista
        itemAtual.id = itens[itens.length-1] ? itens[itens.length-1].id + 1 : 0;
        criaElemento(itemAtual);
        itens.push(itemAtual);
    } else {
        //atualiza o elemento existente
        itemAtual.id = elementoEncontrado.id;
        atualizaElemento(itemAtual)
        //atualiza o array itens com base no id
        itens[itens.findIndex(elemento => elemento.id === elementoEncontrado.id)] = itemAtual
    }

    atuzalizaItems();
    limpaFormulario();

})

function criaElemento(item) {
    const novoElemento = document.createElement('li');
    const quantidadeItem = document.createElement('strong');

    novoElemento.classList.add('item');
    quantidadeItem.dataset.id = item.id
    quantidadeItem.innerHTML = item.quantidade;

    novoElemento.appendChild(quantidadeItem);
    novoElemento.innerHTML += item.nome;
    novoElemento.appendChild(criaElementoBotao(item.id))
    lista.appendChild(novoElemento);

}

function criaElementoBotao(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add("botao-excluir")
    elementoBotao.addEventListener('click', function (){
    deletaElemento(this.parentNode, id)});

    return elementoBotao;
}

function deletaElemento(tag, id){
    tag.remove();
    console.log(id);
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    atuzalizaItems();
}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function atuzalizaItems(){
    localStorage.setItem("itens", JSON.stringify(itens));
}

function limpaFormulario() {
    nome.value = '';
    quantidade.value = '';
}