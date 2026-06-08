function pegarCarrinho() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function salvarCarrinho(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function adicionarCarrinho(produto) {

  const cart = pegarCarrinho();

  const existente = cart.find(item =>
    item.nome === produto.nome
  );

  if (existente) {
    existente.quantidade += 1;
  }

  else {

    cart.push({
      ...produto,
      quantidade: 1
    });

  }

  salvarCarrinho(cart);

  if (typeof showToast === "function") {
    showToast("Produto adicionado");
  }

}

function alterarQuantidade(index, tipo) {

  const cart = pegarCarrinho();

  if (tipo === "mais") {
    cart[index].quantidade += 1;
  }

  if (tipo === "menos") {

    cart[index].quantidade -= 1;

    if (cart[index].quantidade <= 0) {
      cart.splice(index, 1);
    }

  }

  salvarCarrinho(cart);

  renderizarCarrinho();

}

function limparCarrinho() {

  const confirmar = confirm("Deseja limpar o carrinho?");

  if (!confirmar) return;

  localStorage.removeItem("cart");

  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }

  renderizarCarrinho();

}

function calcularSubtotal(item) {
  return item.preco * item.quantidade;
}

function calcularTotal() {

  const cart = pegarCarrinho();

  return cart.reduce((acc, item) => {
    return acc + calcularSubtotal(item);
  }, 0);

}

function renderizarCarrinho() {

  const container = document.getElementById("cart-items");

  if (!container) return;

  const totalEl = document.getElementById("total");
  const subtotalEl = document.getElementById("subtotal");
  const freteEl = document.getElementById("frete");

  const cart = pegarCarrinho();

  container.innerHTML = "";

  if (cart.length === 0) {

    container.innerHTML = `
    
      <div class="empty-cart">
        Seu carrinho está vazio.
      </div>
    
    `;

    if (totalEl) totalEl.innerText = "R$ 0,00";

    if (typeof updateCartBadge === "function") {
      updateCartBadge();
    }

    return;

  }

  cart.forEach((item, index) => {

    container.innerHTML += `

      <div class="cart-item">

        <div class="cart-info">

          <h3>${item.nome}</h3>

          ${item.descricao ? `
            <p>${item.descricao}</p>
          ` : ""}

          <strong>
            ${formatarPreco(calcularSubtotal(item))}
          </strong>

        </div>

        <div class="cart-actions">

          <button
            onclick="alterarQuantidade(${index}, 'menos')"
            class="qty-btn">
            −
          </button>

          <span class="qty-number">
            ${item.quantidade}
          </span>

          <button
            onclick="alterarQuantidade(${index}, 'mais')"
            class="qty-btn">
            +
          </button>

        </div>

      </div>

    `;

  });

  const subtotal = calcularTotal();

  let frete = 0;

  const tipo = document.getElementById("tipo");
  const perimetro = document.getElementById("perimetro");

  if (perimetro) {

    if ((!tipo || tipo.value === "Entrega") && perimetro.value.includes("Fora")) {
      frete = 8;
    }

  }

  const total = subtotal + frete;

  if (subtotalEl) {
    subtotalEl.innerText = formatarPreco(subtotal);
  }

  if (freteEl) {
    freteEl.innerText = formatarPreco(frete);
  }

  if (totalEl) {
    totalEl.innerText = formatarPreco(total);
  }

  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }

}

document.addEventListener("DOMContentLoaded", () => {

  renderizarCarrinho();

  const perimetro = document.getElementById("perimetro");

  if (perimetro) {

    perimetro.addEventListener("change", () => {
      renderizarCarrinho();
    });

  }

});
