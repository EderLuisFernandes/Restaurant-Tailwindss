const menu = document.getElementById("menu");
const cartBtn = document.getElementById("card-btn");
const cartModal = document.getElementById("cart-modal");
const cartItens = document.getElementById("cart-items");
const Total = document.getElementById("cart-total");
const checkout = document.getElementById("checkout-btn");
const fechar = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const address = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const adicionaCarrinho = document.querySelector(".add-to-card-btn");
const horas = document.getElementById("date-span");
const cart = [];
const open = abertFechado();
if (open) {
  horas.classList.add("bg-green-500");
  horas.classList.remove("bg-red-500");
} else {
  horas.classList.remove("bg-green-500");
  horas.classList.add("bg-red-500");
}

function abrircarrinho() {
  atualizarCarrinho();
  cartModal.style.display = "flex";
}
function fecharLista() {
  cartModal.style.display = "none";
}
function fecharPage(event) {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
  }
}

// pega os valores quando clica nos botão pra escolher
function AddcArt(event) {
  let parentButton = event.target.closest(".add-to-card-btn");
  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parseFloat(parentButton.getAttribute("data-price"));
    addtoCarrinho(name, price);
  }
}
// add ao carrinho
function addtoCarrinho(name, price) {
  const ItenExistente = cart.find((item) => item.name === name);
  if (ItenExistente) {
    ItenExistente.quatidade += 1;
  } else {
    cart.push({
      name,
      price,
      quatidade: 1,
    });
  }
  atualizarCarrinho();
}
function atualizarCarrinho() {
  let total = 0;
  cartItens.innerHTML = "";

  cart.forEach((item) => {
    const cardElemento = document.createElement("div");
    cardElemento.classList.add("flex", "justify-between", "mb-4", "flex-col");
    cardElemento.innerHTML = `
    <div class="flex justify-between items-center">
  <div>
    <h4 class="font-bold">${item.name}</h4>
    <span>Qtd: ${item.quatidade}</span>
    <p class="mt-2 font-medium">R$:${item.price.toFixed(2)}</p>  
  </div>
  <div>
    <button class="remove-btn" data-name="${item.name}">
    Remover
    </button>
  </div>
    </div>
    `;
    total += item.price * item.quatidade;
    // ele adiciona dentro do carrinho
    cartItens.appendChild(cardElemento);
  });

  Total.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  //   ele vai mostrar na tela quanto intens eu adicionei
  cartCounter.innerHTML = cart.length;
}
// rewmover

function removeB(event) {
  if (event.target.classList.contains("remove-btn")) {
    const name = event.target.getAttribute("data-name");
    removeCart(name);
  }
}

function removeCart(name) {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quatidade > 1) {
      item.quatidade -= 1;
      atualizarCarrinho();
      return;
    }
    cart.splice(index, 1);
    atualizarCarrinho();
  }
}
function Endereco(event) {
  let inputValue = event.target.inputValue;
  if (inputValue !== "") {
    address.classList.remove("border-red-500");
    addressWarn.classList.add("hidden");
  }
}

function FinalizarP() {
    const open = abertFechado();
    if (!open) {
      alert("RESTAURANTE FECHADO");
      return;
    }
  if (cart.length === 0) return;
  if (address.value === "") {
    addressWarn.classList.remove("hidden");
    address.classList.add("border-red-500");
    return;
  }

  //   envia pedido no zap
  const cartIte = cart
    .map((item) => {
      return `
     ${item.name} | quantidade:(${item.quatidade})| Preço: R$${item.price} | 
    `;
    })
    .join(" ");
  const mensagem = encodeURIComponent(cartIte);
  const phone = "71982035104";
  window.open(
    `https://wa.me/${phone}?text=${mensagem} Endereço: ${address.value}`,
    "_black"
  );
  cart = []
  atualizarCarrinho()

}

function abertFechado() {
  const data = new Date();
  const hora = data.getHours();
  return hora >= 18 && hora < 22;
}




checkout.addEventListener("click", FinalizarP);
address.addEventListener("input", Endereco);
cartItens.addEventListener("click", removeB);
cartBtn.addEventListener("click", abrircarrinho);
fechar.addEventListener("click", fecharLista);
cartModal.addEventListener("click", fecharPage);
menu.addEventListener("click", AddcArt);
