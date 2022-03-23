const data = [
    {
        id: '1',
        titulo: 'Lightweight Jacket',
        descricao: 'Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...',
        img: 'img/Men-Jacket-Front-Black__15466 1.png',
        tags: ['Camisetas'],
        preco: 'R$ 100,00',
        cart: 'Adicionar ao carrinho'
    },
    {
        id: '2',
        titulo: 'Black Hat',
        descricao: 'O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...',
        img: 'img/image 1.png',
        tags: ['Acessórios'],
        preco: 'R$ 100,00',
        cart: 'Adicionar ao carrinho'
    },
    {
        id: '3',
        titulo: 'Mask',
        descricao: 'Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...',
        img: 'img/Surgical-Mask-Black__89554 1.png',
        tags: ['Acessórios'],
        preco: 'R$ 40,00',
        cart: 'Adicionar ao carrinho'
    },
    {
        id: '4',
        titulo: 'T-Shirt',
        descricao: 'Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...',
        img: 'img/Men-TShirt-Black-Front__70046 1.png',
        tags: ['Camisetas'],
        preco: 'R$ 100,00',
        cart: 'Adicionar ao carrinho'
    },
    {
        id: '5',
        titulo: 'Short-Sleeve T-Shirt',
        descricao: 'Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...',
        img: 'img/mockup-a0dc2330__62146 1.png',
        tags: ['Camisetas'],
        preco: 'R$ 100,00',
        cart: 'Adicionar ao carrinho'
    },
    {
        id: '6',
        titulo: 'Champion Packable Jacket',
        descricao: 'Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...',
        img: 'img/mockup-9b9894f1__67347 1.png',
        tags: ['Camisetas'],
        preco: 'R$ 100,00',
        cart: 'Adicionar ao carrinho'
    }
]

function createPost(arrayPosts){
    const list = document.querySelector('.post-list')
    list.innerHTML = ''

    for (let i = 0; i < arrayPosts.length; i++){
        const li = document.createElement('li')
        li.classList.add('cardItem')

        const divImg = document.createElement('div')
        divImg.classList.add('boxImg')

        const img = document.createElement('img')
        img.src = arrayPosts[i].img

        const boxText = document.createElement('div')
        boxText.classList.add('boxText')

        const h2 = document.createElement('h2')
        h2.innerText = arrayPosts[i].titulo

        const descricao = document.createElement('p')
        descricao.classList.add('descricao')
        descricao.innerText = arrayPosts[i].descricao

        const preco = document.createElement('span')
        preco.classList.add('preco')
        preco.innerText = arrayPosts[i].preco

        const addCart = document.createElement('p')
        addCart.classList.add('addCart')
        addCart.innerText = arrayPosts[i].cart
        addCart.id = arrayPosts[i].id

        li.appendChild(divImg)
        divImg.appendChild(img)
        li.appendChild(boxText)

        let arrayTags = arrayPosts[i].tags
        for (let j = 0; j < arrayTags.length; j++){
            const tag = document.createElement('span')
            tag.classList.add('tipoPeca')
            tag.innerText = arrayTags[j]
            boxText.appendChild(tag)
        }

        boxText.appendChild(h2)
        boxText.appendChild(descricao)
        boxText.appendChild(preco)
        boxText.appendChild(addCart)
        
        list.appendChild(li)
    }
}

createPost(data)

function filterPosts(event){
    const newData= []
    const item = event.target
    const arrayItens = document.querySelectorAll('.item-nav')

    if(item.dataset.tag === 'Todos'){
        createPost(data)
    }else{
        for (let i = 0; i < data.length; i++){
            if(data[i].tags.indexOf(item.dataset.tag) !== -1){
                newData.push(data[i])
            } 
        }
        createPost(newData)
    }

    for(let i = 0; i < arrayItens.length; i++){
        arrayItens[i].classList.remove('active')
    }
    item.classList.add('active')
}

function findPosts(){
    const inputValue = document.getElementById('inputFind')
    const newData = []

    for (let i = 0; i < data.length; i++){
        if (data[i].tags.indexOf(inputValue.value) !== -1){
            newData.push(data[i])
        } else if (data[i].titulo.indexOf(inputValue.value) !== -1){
            newData.push(data[i])
        }
    }
    createPost(newData)
}

const botaoBuscar = document.getElementById('pesquisar')
botaoBuscar.addEventListener('click', findPosts)

const listItem = document.getElementById('listNav')
listItem.addEventListener('click', filterPosts)

const carrinho = []

const listaDeProdutos = document.querySelector('.post-list')
const listaDoCarrinho = document.querySelector('.ulcarrinho')
listaDeProdutos.addEventListener("click", interceptarEvento)

function interceptarEvento(event) {
    const addCart = event.target
    if (addCart.tagName == "P"){
        const idProduto = addCart.id
        adicionarProduto(idProduto)
    }
}

function listarProdutosNoCarrinho(){
    const li = document.createElement('li')
    const boxMini = document.createElement('div')
    boxMini.classList.add('boxMini')
    const img = document.createElement('img')
    const textMini = document.createElement('div')
    textMini.classList.add('textMini')
    const preco = document.createElement('p')
    const h3 = document.createElement('h3')
    const removeClass = document.createElement('button')
    for (let i = 0; i < carrinho.length; i++){
        img.src = carrinho[i].img
        h3.innerText = carrinho[i].titulo
        preco.innerText = carrinho[i].preco
        removeClass.innerText = 'Remover produto'
        removeClass.onclick = function(){
            remove(carrinho[i])
            li.remove()
        }
    li.append(boxMini)
    boxMini.appendChild(img)
    li.appendChild(textMini)
    textMini.appendChild(h3)
    textMini.appendChild(preco)
    textMini.appendChild(removeClass)
    
    const ulcarrinho = document.getElementById('ulcarrinho')
    ulcarrinho.appendChild(li)
    }
}

function remove(produto){
    carrinho.splice(produto,1);
}

function adicionarProduto(idProduto){
    const produtoDoCarrinho = data.find((produto) => produto.id == idProduto)
    if (produtoDoCarrinho){
        carrinho.push(produtoDoCarrinho)
        listarProdutosNoCarrinho()
    }
    empty()
}

function empty(){
    document.getElementById('cartVazio').style.visibility = "hidden";
}

