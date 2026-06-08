let dadosCardapio = null;

const OPCOES_PIZZA = [
  { nome: "6 pedaços", preco: 50 },
  { nome: "8 pedaços", preco: 60 },
  { nome: "12 pedaços", preco: 70 }
];

const OPCOES_PASTEL = [
  { nome: "Tradicional", preco: 15.9 },
  { nome: "Especial", preco: 19.9 }
];

const MAX_SABORES_PASTEL = 4;

function criarSlug(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const cardapio = {
  porcoes: [
    {
      nome: "Batata Frita",
      descricao: "Porção crocante de batata frita, ideal para acompanhar lanches e pizzas.",
      preco: 22,
      imagem: "assets/imagens/batata-frita.png"
    },
    {
      nome: "Batata com Bacon",
      descricao: "Batata frita com bacon em pedaços, servida bem quente.",
      preco: 30,
      imagem: "assets/imagens/batata-com-bacon.png"
    },
    {
      nome: "Frango à Passarinho",
      descricao: "Frango temperado e frito, uma porção clássica para compartilhar.",
      preco: 30,
      imagem: "assets/imagens/frango-passarinho.png"
    },
    {
      nome: "Peixe Frito",
      descricao: "Peixe frito sequinho, preparado para servir como porção.",
      preco: 38,
      imagem: "assets/imagens/peixe-frito.png"
    },
    {
      nome: "Polenta com Calabresa ou Bacon",
      descricao: "Polenta frita com opção de calabresa ou bacon.",
      preco: 35,
      imagem: "assets/imagens/polenta-calabresa-bacon.png"
    },
    {
      nome: "Mandioca Frita com Calabresa ou Bacon",
      descricao: "Mandioca frita com opção de calabresa ou bacon.",
      preco: 30,
      imagem: "assets/imagens/mandioca-calabresa-bacon.png"
    },
    {
      nome: "Salgados Fritos",
      descricao: "Mix de salgados fritos para dividir ou pedir como entrada.",
      preco: 30,
      imagem: "assets/imagens/salgados-fritos.png"
    }
  ],
  lanches: [
    {
      nome: "X-Burger",
      descricao: "Pão, maionese, hambúrguer, presunto, queijo, milho e ervilha.",
      preco: 15,
      imagem: "assets/imagens/x-burger.png"
    },
    {
      nome: "X-Salada",
      descricao: "Pão, maionese, hambúrguer, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 18,
      imagem: "assets/imagens/x-salada.png"
    },
    {
      nome: "X-Bacon",
      descricao: "Pão, maionese, hambúrguer, bacon, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-bacon.png"
    },
    {
      nome: "X-Egg",
      descricao: "Pão, maionese, hambúrguer, ovo, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-egg.png"
    },
    {
      nome: "X-Tudo",
      descricao: "Pão, maionese, hambúrguer, ovo, bacon, calabresa, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 25,
      imagem: "assets/imagens/x-tudo.png"
    },
    {
      nome: "X-Calabresa",
      descricao: "Pão, maionese, hambúrguer, calabresa, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-calabresa.png"
    },
    {
      nome: "X-Frango",
      descricao: "Pão, maionese, hambúrguer, frango, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-frango.png"
    }
  ],
  pizzas: [
    {
      nome: "Mussarela",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, tomate, orégano e azeitona."
    },
    {
      nome: "Milho",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, presunto, milho e orégano."
    },
    {
      nome: "Presunto",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, presunto e orégano."
    },
    {
      nome: "Calabresa",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, calabresa, cebola e orégano."
    },
    {
      nome: "Quatro Queijos",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, parmesão, provolone e orégano."
    },
    {
      nome: "Frango com Catupiry",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, frango, catupiry e orégano."
    },
    {
      nome: "Portuguesa",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, presunto, bacon, ovo, cebola, ervilha, azeitona e orégano."
    },
    {
      nome: "Paulista",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, palmito, presunto, azeitona e orégano."
    },
    {
      nome: "Frango com Bacon",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, frango, bacon, catupiry e orégano."
    },
    {
      nome: "Lombinho",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, lombinho defumado, catupiry e orégano."
    },
    {
      nome: "Humita",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, milho, champignon, azeitona e orégano."
    },
    {
      nome: "Fratelli",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, presunto, bacon, calabresa, ervilha, palmito, azeitona e orégano."
    },
    {
      nome: "Palmito",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, palmito, azeitona e orégano."
    },
    {
      nome: "Bacon",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, bacon, palmito, azeitona e orégano."
    },
    {
      nome: "Champignon",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, champignon, tomate, palmito, azeitona e orégano."
    },
    {
      nome: "Primavera",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, tomate, ervilha, milho, cebola, creme de leite e orégano."
    },
    {
      nome: "Calabresa com Catupiry",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, calabresa, catupiry e orégano."
    },
    {
      nome: "Baiana",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, presunto, calabresa, cebola, pimenta e orégano."
    },
    {
      nome: "Mineirinha",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, lombinho, tomate, cebola e orégano."
    },
    {
      nome: "Salaminho",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, salaminho, cebola e orégano."
    },
    {
      nome: "Brigadeiro",
      tipo: "Doce",
      descricao: "Chocolate, ganache e chocolate granulado."
    },
    {
      nome: "Chocolate Branco",
      tipo: "Doce",
      descricao: "Chocolate branco, ganache e cereja."
    },
    {
      nome: "Romeu e Julieta",
      tipo: "Doce",
      descricao: "Goiabada, mussarela e creme."
    },
    {
      nome: "Califórnia",
      tipo: "Doce",
      descricao: "Figo, abacaxi e leite condensado."
    },
    {
      nome: "Prestígio",
      tipo: "Doce",
      descricao: "Coco, creme e chocolate."
    },
    {
      nome: "Banana",
      tipo: "Doce",
      descricao: "Creme de banana e chocolate."
    }
  ],
  pasteis: [
    "Carne",
    "Presunto",
    "Frango",
    "Mussarela",
    "Calabresa",
    "Palmito",
    "Bacon",
    "Tomate",
    "Catupiry",
    "Azeitona",
    "Champignon",
    "Banana",
    "Morango",
    "Chocolate"
  ],
  bebidas: [
    {
      nome: "Coca-Cola 2L",
      descricao: "Refrigerante Coca-Cola 2 litros.",
      preco: 12
    },
    {
      nome: "Guaraná 2L",
      descricao: "Refrigerante Guaraná 2 litros.",
      preco: 11
    }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarCardapio(cardapio);
  configurarBuscaCardapio();
  configurarOpcoesPastel();
});

function iniciarCardapio(data) {
  dadosCardapio = data;

  renderizarProdutos(data.porcoes || [], "porcoes", "Porções");
  renderizarProdutos(data.lanches || [], "lanches", "Lanches");
  renderizarPizzas(data.pizzas || []);
  renderizarSaboresPastel(data.pasteis || []);
  renderizarProdutos(data.bebidas || [], "bebidas", "Bebidas");
  filtrarCardapio();
}

function renderizarProdutos(produtos, id, categoria) {
  const container = document.getElementById(id);

  if (!container) return;

  container.innerHTML = "";

  produtos.forEach(produto => {
    container.innerHTML += `
      <article class="product-card" data-search="${obterTextoBusca(produto.nome, produto.descricao)}">
        <div class="product-image">
          ${categoria ? `<span class="image-badge">${categoria}</span>` : ""}
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

function obterImagemPizza(pizza) {
  return pizza.imagem || `assets/imagens/pizza-${criarSlug(pizza.nome)}.png`;
}

function renderizarListaPizzas(pizzas, id) {
  const container = document.getElementById(id);

  if (!container) return;

  container.innerHTML = "";

  pizzas.forEach(pizza => {
    const categoriaPizza = normalizarTipoPizza(pizza.tipo) === "doce" ? "Pizzas Doces" : "Pizzas Salgadas";
    const botoesTamanho = OPCOES_PIZZA.map((opcao, index) => `
      <button
        type="button"
        class="size-btn ${index === 0 ? "active" : ""}"
        data-tamanho="${opcao.nome}"
        data-preco="${opcao.preco}"
        aria-pressed="${index === 0 ? "true" : "false"}"
        onclick="selecionarTamanhoPizza(${pizza.index}, this)">
        <span>${opcao.nome.replace(/\D/g, "")}</span>
        <small>${formatarPreco(opcao.preco).replace(",00", "")}</small>
      </button>
    `).join("");

    container.innerHTML += `
      <article class="product-card" data-pizza-index="${pizza.index}" data-search="${obterTextoBusca(pizza.nome, pizza.descricao, pizza.tipo)}">
        <div class="product-image">
          <span class="image-badge">${categoriaPizza}</span>
          <img src="${obterImagemPizza(pizza)}" alt="${pizza.nome}" onerror="this.parentElement.textContent='FOTO'">
        </div>

        <div class="product-content">
          <h3>${pizza.nome}</h3>
          <p>${pizza.descricao || ""}</p>

          <div class="pizza-sizes" role="group" aria-label="Escolha o tamanho da pizza">
            ${botoesTamanho}
          </div>

          <div class="product-bottom">
            <span class="price" id="pizza-preco-${pizza.index}">${formatarPreco(OPCOES_PIZZA[0].preco)}</span>

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
      <label class="sabor-item" data-search="${normalizarBusca(sabor)}">
        <input type="checkbox" value="${sabor}">
        <span>${sabor}</span>
      </label>
    `;
  });

  container.addEventListener("change", limitarSaboresPastel);
}

function configurarOpcoesPastel() {
  const select = document.getElementById("pastel-opcao");

  if (!select) return;

  select.innerHTML = OPCOES_PASTEL.map(opcao => `
    <option value="${opcao.nome}" data-preco="${opcao.preco}">
      ${opcao.nome} - ${formatarPreco(opcao.preco)}
    </option>
  `).join("");

  select.addEventListener("change", atualizarPrecoPastel);
  atualizarPrecoPastel();
}

function obterOpcaoPastelSelecionada() {
  const select = document.getElementById("pastel-opcao");
  const option = select ? select.options[select.selectedIndex] : null;

  return {
    nome: option ? option.value : OPCOES_PASTEL[0].nome,
    preco: option ? Number(option.dataset.preco) : OPCOES_PASTEL[0].preco
  };
}

function atualizarPrecoPastel() {
  const precoEl = document.getElementById("pastel-preco");
  const opcao = obterOpcaoPastelSelecionada();

  if (precoEl) {
    precoEl.textContent = formatarPreco(opcao.preco);
  }
}

function configurarBuscaCardapio() {
  const busca = document.getElementById("busca-cardapio");

  if (!busca) return;

  busca.addEventListener("input", filtrarCardapio);
}

function obterTextoBusca(...partes) {
  return normalizarBusca(partes.filter(Boolean).join(" "));
}

function normalizarBusca(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function filtrarCardapio() {
  const busca = document.getElementById("busca-cardapio");
  const termo = normalizarBusca(busca ? busca.value : "");
  const grupos = document.querySelectorAll(".menu-section, .pizza-group");

  document.querySelectorAll(".product-card, .sabor-item").forEach(item => {
    const texto = item.dataset.search || normalizarBusca(item.textContent);
    item.classList.toggle("is-hidden", termo && !texto.includes(termo));
  });

  grupos.forEach(grupo => {
    const itens = grupo.querySelectorAll(".product-card, .sabor-item");
    const algumVisivel = Array.from(itens).some(item => !item.classList.contains("is-hidden"));
    grupo.classList.toggle("is-hidden", termo && itens.length > 0 && !algumVisivel);
  });
}

function limitarSaboresPastel() {
  const selecionados = document.querySelectorAll("#sabores input:checked");
  const todos = document.querySelectorAll("#sabores input");
  const contador = document.getElementById("pastel-contador");

  todos.forEach(input => {
    input.disabled = selecionados.length >= MAX_SABORES_PASTEL && !input.checked;
    input.closest(".sabor-item").classList.toggle("selected", input.checked);
  });

  if (contador) {
    contador.textContent = `${selecionados.length} de ${MAX_SABORES_PASTEL} sabores selecionados`;
  }
}

function adicionarPastel() {
  const checks = document.querySelectorAll("#sabores input:checked");

  if (checks.length === 0) {
    alert("Escolha pelo menos 1 sabor.");
    return;
  }

  if (checks.length > MAX_SABORES_PASTEL) {
    alert(`Escolha no máximo ${MAX_SABORES_PASTEL} sabores.`);
    return;
  }

  const opcao = obterOpcaoPastelSelecionada();
  const sabores = Array.from(checks).map(item => item.value);

  adicionarCarrinho({
    nome: `Pastel ${opcao.nome} (${sabores.join(", ")})`,
    descricao: "Pastel montado pelo cliente",
    preco: opcao.preco
  });
}
