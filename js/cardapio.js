let dadosCardapio = null;

const cardapioFallback = {
  porcoes: [
    { nome: "Batata Frita", descricao: "Batata crocante", preco: 25 },
    { nome: "Calabresa Acebolada", descricao: "Calabresa fatiada com cebola", preco: 35 }
  ],
  lanches: [
    { nome: "X-Burger", descricao: "Hambúrguer, queijo e molho especial", preco: 22 },
    { nome: "X-Tudo", descricao: "Lanche completo da casa", preco: 35 }
  ],
  pizzas: [
    { nome: "Calabresa", tipo: "Salgada", descricao: "Calabresa, cebola e mussarela" },
    { nome: "Frango com Catupiry", tipo: "Salgada", descricao: "Frango, catupiry e mussarela" },
    { nome: "Chocolate", tipo: "Doce", descricao: "Chocolate cremoso" }
  ],
  pasteis: [
    "Carne", "Queijo", "Frango", "Pizza", "Calabresa", "Palmito",
    "Bacon", "Milho", "Catupiry", "Chocolate", "Banana", "Brigadeiro", "Prestígio"
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  carregarCardapio();
});

async function carregarCardapio() {
  try {
    const response = await fetch("./data/cardapio.json");

    if (!response.ok) {
      throw new Error("Erro ao carregar JSON");
    }

    const data = await response.json();
    iniciarCardapio(data);

  } catch (error) {
    console.warn("Usando cardápio provisório:", error);
    iniciarCardapio(cardapioFallback);
  }
}

function iniciarCardapio(data) {
  dadosCardapio = data;

  renderizarProdutos(data.porcoes || [], "porcoes");
  renderizarProdutos(data.lanches || [], "lanches");
  renderizarPizzas(data.pizzas || []);
  renderizarSaboresPastel(data.pasteis || []);
}

function renderizarProdutos(produtos, id) {
  const container = document.getElementById(id);

  if (!container) return;

  container.innerHTML = "";

  produtos.forEach(produto => {
    container.innerHTML += `
      <article class="product-card">
        <div class="product-image">
          ${produto.imagem ? `<img src="${produto.imagem}" alt="${produto.nome}">` : "FOTO"}
        </div>

        <div class="product-content">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao || ""}</p>

          <div class="product-bottom">
            <span class="price">${formatarPreco(produto.preco)}</span>

            <button
              class="add-btn"
              onclick='adicionarCarrinho(${JSON.stringify(produto)})'>
              +
            </button>
          </div>
        </div>
      </article>
    `;
  });
}

function renderizarPizzas(pizzas) {
  const pizzasComIndice = pizzas.map((pizza, index) => ({ ...pizza, index }));
  const pizzasSalgadas = pizzasComIndice.filter(pizza => normalizarTipoPizza(pizza.tipo) !== "doce");
  const pizzasDoces = pizzasComIndice.filter(pizza => normalizarTipoPizza(pizza.tipo) === "doce");

  renderizarListaPizzas(pizzasSalgadas, "pizzas-salgadas");
  renderizarListaPizzas(pizzasDoces, "pizzas-doces");
}

function normalizarTipoPizza(tipo) {
  return String(tipo || "Salgada").trim().toLowerCase();
}

function obterImagemPadraoPizza(tipo) {
  return normalizarTipoPizza(tipo) === "doce"
    ? "assets/imagens/pizza_doce_padrao.png"
    : "assets/imagens/pizza_salgada_padrao.png";
}

function renderizarListaPizzas(pizzas, id) {
  const container = document.getElementById(id);

  if (!container) return;

  container.innerHTML = "";

  pizzas.forEach(pizza => {
    container.innerHTML += `
      <article class="product-card" data-pizza-index="${pizza.index}">
        <div class="product-image">
          <img src="${pizza.imagem || obterImagemPadraoPizza(pizza.tipo)}" alt="${pizza.nome}">
        </div>

        <div class="product-content">
          <h3>${pizza.nome}</h3>
          <p>${pizza.descricao || ""}</p>
          <p class="product-meta">${pizza.tipo || "Salgada"}</p>

          <div class="pizza-sizes" role="group" aria-label="Escolha o tamanho da pizza">
            <button
              type="button"
              class="size-btn active"
              data-tamanho="6 pedaços"
              data-preco="50"
              aria-pressed="true"
              onclick="selecionarTamanhoPizza(${pizza.index}, this)">
              <span>6</span>
              <small>R$ 50</small>
            </button>

            <button
              type="button"
              class="size-btn"
              data-tamanho="8 pedaços"
              data-preco="60"
              aria-pressed="false"
              onclick="selecionarTamanhoPizza(${pizza.index}, this)">
              <span>8</span>
              <small>R$ 60</small>
            </button>

            <button
              type="button"
              class="size-btn"
              data-tamanho="12 pedaços"
              data-preco="70"
              aria-pressed="false"
              onclick="selecionarTamanhoPizza(${pizza.index}, this)">
              <span>12</span>
              <small>R$ 70</small>
            </button>
          </div>

          <div class="product-bottom">
            <span class="price" id="pizza-preco-${pizza.index}">R$ 50,00</span>

            <button class="add-btn" onclick="adicionarPizza(${pizza.index})">
              +
            </button>
          </div>
        </div>
      </article>
    `;
  });
}

function selecionarTamanhoPizza(index, botaoSelecionado) {
  const botoes = document.querySelectorAll(`[data-pizza-index="${index}"] .size-btn`);
  const preco = Number(botaoSelecionado.dataset.preco);
  const precoEl = document.getElementById(`pizza-preco-${index}`);

  botoes.forEach(botao => {
    const selecionado = botao === botaoSelecionado;
    botao.classList.toggle("active", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));
  });

  if (precoEl) {
    precoEl.textContent = formatarPreco(preco);
  }
}

function adicionarPizza(index) {
  const pizza = dadosCardapio.pizzas[index];
  const tamanhoSelecionado = document.querySelector(`[data-pizza-index="${index}"] .size-btn.active`);

  const produto = {
    nome: `Pizza ${pizza.nome} (${tamanhoSelecionado.dataset.tamanho})`,
    descricao: pizza.descricao || "",
    preco: Number(tamanhoSelecionado.dataset.preco)
  };

  adicionarCarrinho(produto);
}

function renderizarSaboresPastel(sabores) {
  const container = document.getElementById("sabores");

  if (!container) return;

  container.innerHTML = "";

  sabores.forEach(sabor => {
    container.innerHTML += `
      <label class="sabor-item">
        <input type="checkbox" value="${sabor}">
        <span>${sabor}</span>
      </label>
    `;
  });

  container.addEventListener("change", limitarSaboresPastel);
}

function limitarSaboresPastel() {
  const selecionados = document.querySelectorAll("#sabores input:checked");
  const todos = document.querySelectorAll("#sabores input");
  const contador = document.getElementById("pastel-contador");

  todos.forEach(input => {
    input.disabled = selecionados.length >= 4 && !input.checked;
    input.closest(".sabor-item").classList.toggle("selected", input.checked);
  });

  if (contador) {
    contador.textContent = `${selecionados.length} de 4 sabores selecionados`;
  }
}

function adicionarPastel() {
  const checks = document.querySelectorAll("#sabores input:checked");

  if (checks.length === 0) {
    alert("Escolha pelo menos 1 sabor.");
    return;
  }

  if (checks.length > 4) {
    alert("Escolha no máximo 4 sabores.");
    return;
  }

  const sabores = Array.from(checks).map(item => item.value);

  adicionarCarrinho({
    nome: `Pastel (${sabores.join(", ")})`,
    descricao: "Pastel montado pelo cliente",
    preco: 10
  });
}
