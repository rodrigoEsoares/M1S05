const input = document.getElementById("input");
const carrinho = document.getElementById("list-item");
const btn_consultar = document.getElementById("btn_consultar");
const btn_comprar = document.getElementById("btn_comprar");
let subtotal = document.getElementById("price");

let products = [
  {
    nome: "arroz",
    valor: 4.89,
    cod: "123456",
  },
  {
    nome: "feijão",
    valor: 6.89,
    cod: "8945216",
  },
  {
    nome: "macarrão",
    valor: 5.89,
    cod: "165894",
  },
  {
    nome: "farinha",
    valor: 8.89,
    cod: "246985",
  },
  {
    nome: "açúcar",
    valor: 9.89,
    cod: "910159",
  },
];

// *************  Botão consultar ****************

btn_consultar.addEventListener("click", () => {
  if (input.value.trim() == "") {
    alert("Informe o nome do produto!");
    return;
  }

  const produto = products.find((element) => {
    if (
      element.nome.toLocaleLowerCase() === input.value.toLocaleLowerCase() ||
      element.cod === input.value
    ) {
      alert(`
      Produto: ${element.nome}
      Preço: ${element.valor}`);

      return true;
    }
  });

  if (!produto) {
    alert("Produto não encontrado!");
  }
  input.value = "";
});

// ************** Botão comprar ****************

let lista = [];

btn_comprar.addEventListener("click", () => {
  if (input.value.trim() == "") {
    alert("Informe o nome do produto!");
    return;
  }

  const produto = products.find((element) => {
    if (
      element.nome.toLowerCase() === input.value.toLowerCase() ||
      element.cod === input.value
    ) {
      lista.push(element);
      show();
      totalItens();
      return true;
    }
  });

  if (!produto) {
    alert("Produto não encontrado!");
  }

  input.value = "";
});

// ************** Mostrar no carrinho ****************

function show() {
  let newLi = "";

  let soma = 0;
  lista.forEach((element) => {
    soma += element.valor;

    newLi =
      newLi +
      `
    <h3 class="list-item-name">Produto: ${element.nome}</h3>
    <p class="list-item-price">preço: ${element.valor}</p>
    <p class="list-item-code">cod:${element.cod}</p>
    
    
    `;
    carrinho.innerHTML = newLi;
    localStorage.setItem("carrinho", JSON.stringify(lista));
  });

  subtotal.innerHTML = soma.toFixed(2);
}

// ************** Total de itens ****************


function totalItens() {
  let total = document.getElementById("itens");

  total.innerHTML = lista.length;
}

// ************** Recarregar página ****************

function reload() {
  let listaLocalStorage = localStorage.getItem("carrinho");
  if (listaLocalStorage) {
    lista = JSON.parse(listaLocalStorage);
    show();
    totalItens();
  }
}
reload();
