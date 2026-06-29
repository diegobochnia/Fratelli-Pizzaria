let dadosCardapio = null;

const OPCOES_PIZZA = [
  { nome: "6 pedaços", preco: 50 },
  { nome: "8 pedaços", preco: 60 },
  { nome: "12 pedaços", preco: 70 }
];

const OPCOES_PASTEL = [
  { nome: "Pastel", preco: 10 }
];

const MAX_SABORES_PASTEL = 4;

const SABOR_STROGONOFF = "strogonoff";
const ADICIONAL_STROGONOFF_MEIA = 5;
const ADICIONAL_STROGONOFF_INTEIRA = 10;

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
      imagem: "assets/imagens/batata-frita.webp"
    },
    {
      nome: "Batata com Bacon",
      descricao: "Batata frita com bacon em pedaços, servida bem quente.",
      preco: 30,
      imagem: "assets/imagens/batata-com-bacon.webp"
    },
    {
      nome: "Frango à Passarinho",
      descricao: "Frango temperado e frito, uma porção clássica para compartilhar.",
      preco: 30,
      imagem: "assets/imagens/frango-passarinho.webp"
    },
    {
      nome: "Peixe Frito",
      descricao: "Peixe frito sequinho, preparado para servir como porção.",
      preco: 38,
      imagem: "assets/imagens/peixe-frito.webp"
    },
    {
      nome: "Polenta com Calabresa ou Bacon",
      descricao: "Polenta frita com opção de calabresa ou bacon.",
      preco: 35,
      imagem: "assets/imagens/polenta-calabresa-bacon.webp"
    },
    {
      nome: "Mandioca Frita com Calabresa ou Bacon",
      descricao: "Mandioca frita com opção de calabresa ou bacon.",
      preco: 30,
      imagem: "assets/imagens/mandioca-calabresa-bacon.webp"
    }
  ],
  lanches: [
    {
      nome: "X-Burger",
      descricao: "Pão, maionese, hambúrguer, presunto, queijo, milho e ervilha.",
      preco: 15,
      imagem: "assets/imagens/x-burger.webp"
    },
    {
      nome: "X-Salada",
      descricao: "Pão, maionese, hambúrguer, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 18,
      imagem: "assets/imagens/x-salada.webp"
    },
    {
      nome: "X-Bacon",
      descricao: "Pão, maionese, hambúrguer, bacon, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-bacon.webp"
    },
    {
      nome: "X-Egg",
      descricao: "Pão, maionese, hambúrguer, ovo, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-egg.webp"
    },
    {
      nome: "X-Tudo",
      descricao: "Pão, maionese, hambúrguer, ovo, bacon, calabresa, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 25,
      imagem: "assets/imagens/x-tudo.webp"
    },
    {
      nome: "X-Calabresa",
      descricao: "Pão, maionese, hambúrguer, calabresa, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-calabresa.webp"
    },
    {
      nome: "X-Frango",
      descricao: "Pão, maionese, hambúrguer, frango, presunto, queijo, milho, ervilha, alface, tomate e batata palha.",
      preco: 20,
      imagem: "assets/imagens/x-frango.webp"
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
      nome: "Strogonoff",
      tipo: "Salgada",
      descricao: "Molho de tomate, mussarela, strogonoff cremoso, batata palha e oregano.",
      especial: true
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
    { nome: "Coca-Cola lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Guaraná Antarctica lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Coca-Cola Zero lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Pepsi lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Fanta lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Sprite lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Pepsi Twist lata", descricao: "Refrigerante lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Água tônica lata", descricao: "Bebida lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Del Valle lata", descricao: "Suco lata.", categoria: "Refrigerantes lata", preco: 6 },
    { nome: "Monster lata", descricao: "Energético lata.", categoria: "Energéticos", preco: 12 },
    { nome: "Red Bull lata", descricao: "Energético lata.", categoria: "Energéticos", preco: 12 },
    { nome: "Coca-Cola mini", descricao: "Refrigerante mini.", categoria: "Refrigerantes mini", preco: 3 },
    { nome: "Coca-Cola 600 ml", descricao: "Refrigerante 600 ml.", categoria: "Refrigerantes 600 ml", preco: 8 },
    { nome: "Sprite 600 ml", descricao: "Refrigerante 600 ml.", categoria: "Refrigerantes 600 ml", preco: 8 },
    { nome: "Fanta 600 ml", descricao: "Refrigerante 600 ml.", categoria: "Refrigerantes 600 ml", preco: 8 },
    { nome: "Coca-Cola 1 litro", descricao: "Refrigerante 1 litro.", categoria: "Refrigerantes 1L e 2L", preco: 10 },
    { nome: "Coca-Cola Zero 1 litro", descricao: "Refrigerante 1 litro.", categoria: "Refrigerantes 1L e 2L", preco: 10 },
    { nome: "Coca-Cola 2 litros", descricao: "Refrigerante 2 litros.", categoria: "Refrigerantes 1L e 2L", preco: 15 },
    { nome: "Coca-Cola Zero 2 litros", descricao: "Refrigerante 2 litros.", categoria: "Refrigerantes 1L e 2L", preco: 15 },
    { nome: "Fanta 2 litros", descricao: "Refrigerante 2 litros.", categoria: "Refrigerantes 1L e 2L", preco: 13 },
    { nome: "Sprite 2 litros", descricao: "Refrigerante 2 litros.", categoria: "Refrigerantes 1L e 2L", preco: 13 },
    { nome: "Água com gás", descricao: "Garrafa de água com gás.", categoria: "Águas", preco: 4 },
    { nome: "Água sem gás", descricao: "Garrafa de água sem gás.", categoria: "Águas", preco: 4 },
    { nome: "Vinho 1 litro", descricao: "Garrafa de vinho 1 litro.", categoria: "Vinhos e destilados", preco: 25 },
    { nome: "Vinho 2 litros", descricao: "Garrafa de vinho 2 litros.", categoria: "Vinhos e destilados", preco: 30 },
    { nome: "Vodka", descricao: "Garrafa de vodka.", categoria: "Vinhos e destilados", preco: 30 },
    { nome: "Skol lata", descricao: "Cerveja lata.", categoria: "Cervejas", preco: 5 },
    { nome: "Brahma lata", descricao: "Cerveja lata.", categoria: "Cervejas", preco: 5 },
    { nome: "Ice garrafinha", descricao: "Bebida Ice garrafinha.", categoria: "Ice e long neck", preco: 8 },
    { nome: "Sol long neck", descricao: "Cerveja long neck.", categoria: "Ice e long neck", preco: 8 },
    { nome: "Heineken long neck", descricao: "Cerveja long neck.", categoria: "Ice e long neck", preco: 8 }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  iniciarCardapio(cardapio);
  configurarBuscaCardapio();
  configurarMenuCategoriasFixo();
  atualizarPrecoPastel();
});

function iniciarCardapio(data) {
  dadosCardapio = data;

  renderizarProdutos(data.porcoes || [], "porcoes", "Porções");
  renderizarProdutos(data.lanches || [], "lanches", "Lanches");
  renderizarPizzas(data.pizzas || []);
  renderizarSaboresPastel(data.pasteis || []);
  renderizarBebidas(data.bebidas || []);
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

function renderizarBebidas(bebidas) {
  const container = document.getElementById("bebidas");
  const navegacao = document.getElementById("bebidas-nav");

  if (!container) return;

  const grupos = bebidas.reduce((acc, bebida) => {
    const categoria = bebida.categoria || "Outras bebidas";
    acc[categoria] = acc[categoria] || [];
    acc[categoria].push(bebida);
    return acc;
  }, {});

  container.innerHTML = "";

  if (navegacao) {
    navegacao.innerHTML = Object.keys(grupos).map(categoria => `
      <a href="#${criarSlug(`bebidas-${categoria}`)}">${categoria}</a>
    `).join("");
  }

  Object.entries(grupos).forEach(([categoria, itens]) => {
    const grupoId = criarSlug(`bebidas-${categoria}`);
    const cards = itens.map(bebida => `
      <article class="drink-card" data-search="${obterTextoBusca(bebida.nome, bebida.descricao, bebida.categoria)}">
        <div class="drink-info">
          <h3>${bebida.nome}</h3>
          <p>${bebida.descricao || ""}</p>
        </div>

        <div class="drink-actions">
          <span class="price">${formatarPreco(bebida.preco)}</span>
          <button
            class="add-btn"
            onclick='adicionarCarrinho(${JSON.stringify(bebida)})'>
            +
          </button>
        </div>
      </article>
    `).join("");

    container.innerHTML += `
      <div id="${grupoId}" class="bebida-group">
        <h3 class="subcategory-title">${categoria}</h3>
        <div class="drink-list">
          ${cards}
        </div>
      </div>
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

function ehSaborStrogonoff(sabor) {
  return normalizarBusca(sabor).includes(SABOR_STROGONOFF);
}

function ehPizzaGrande(tamanho) {
  return String(tamanho || "").includes("12");
}

function obterLimiteSaboresPizza(tamanho, sabores = []) {
  if (!ehPizzaGrande(tamanho)) return 2;

  return sabores.some(ehSaborStrogonoff) ? 2 : 3;
}

function calcularAdicionalStrogonoff(sabores = []) {
  if (!sabores.some(ehSaborStrogonoff)) return 0;

  return sabores.length === 1 ? ADICIONAL_STROGONOFF_INTEIRA : ADICIONAL_STROGONOFF_MEIA;
}

function calcularPrecoPizza(precoBase, sabores = []) {
  return Number(precoBase || 0) + calcularAdicionalStrogonoff(sabores);
}

function obterImagemPizza(pizza) {
  return pizza.imagem || `assets/imagens/pizza-${criarSlug(pizza.nome)}.webp`;
}

function renderizarListaPizzas(pizzas, id) {
  const container = document.getElementById(id);

  if (!container) return;

  container.innerHTML = "";

  pizzas.forEach(pizza => {
    const opcoesSabores = obterOpcoesSaboresPizza(pizza.nome);
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
          <h3>
            ${pizza.nome}
            ${pizza.especial ? `<span class="special-flavor-tag">Sabor especial</span>` : ""}
          </h3>
          <p>${pizza.descricao || ""}</p>

          <div class="pizza-sizes" role="group" aria-label="Escolha o tamanho da pizza">
            ${botoesTamanho}
          </div>

          <div class="pizza-flavors" data-pizza-flavors>
            <label>
              <span>2&ordm; sabor (opcional)</span>
              <select class="option-select pizza-flavor-select" data-sabor-extra="2" onchange="atualizarSaboresPizza(${pizza.index})">
                <option value="">Sem 2&ordm; sabor</option>
                ${opcoesSabores}
              </select>
            </label>

            <label class="pizza-third-flavor" data-terceiro-sabor hidden>
              <span>3&ordm; sabor (opcional)</span>
              <select class="option-select pizza-flavor-select" data-sabor-extra="3" onchange="atualizarSaboresPizza(${pizza.index})">
                <option value="">Sem 3&ordm; sabor</option>
                ${opcoesSabores}
              </select>
            </label>

            <p class="pizza-flavor-note" id="pizza-sabores-info-${pizza.index}"></p>
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

  pizzas.forEach(pizza => atualizarSaboresPizza(pizza.index));
}

function selecionarTamanhoPizza(index, botaoSelecionado) {
  const botoes = document.querySelectorAll(`[data-pizza-index="${index}"] .size-btn`);

  botoes.forEach(botao => {
    const selecionado = botao === botaoSelecionado;
    botao.classList.toggle("active", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));
  });

  atualizarSaboresPizza(index);
}

function adicionarPizza(index) {
  const pizza = dadosCardapio.pizzas[index];
  const tamanhoSelecionado = document.querySelector(`[data-pizza-index="${index}"] .size-btn.active`);
  const sabores = obterSaboresPizzaSelecionados(index);
  const limite = obterLimiteSaboresPizza(tamanhoSelecionado.dataset.tamanho, sabores);
  const saboresUnicos = new Set(sabores.map(normalizarBusca));

  if (saboresUnicos.size !== sabores.length) {
    alert("Escolha sabores diferentes para a mesma pizza.");
    return;
  }

  if (sabores.length > limite) {
    alert(`Este tamanho permite no maximo ${limite} sabores.`);
    return;
  }

  const produto = {
    nome: `Pizza ${tamanhoSelecionado.dataset.tamanho} (${sabores.join(" / ")})`,
    descricao: montarDescricaoPizza(pizza, sabores),
    preco: calcularPrecoPizza(tamanhoSelecionado.dataset.preco, sabores)
  };

  adicionarCarrinho(produto);
}

function obterOpcoesSaboresPizza(saborAtual = "") {
  if (!dadosCardapio || !dadosCardapio.pizzas) return "";

  return dadosCardapio.pizzas
    .filter(pizza => normalizarBusca(pizza.nome) !== normalizarBusca(saborAtual))
    .map(pizza => `
      <option value="${pizza.nome}">${pizza.nome}</option>
    `).join("");
}

function obterSaboresPizzaSelecionados(index) {
  const pizza = dadosCardapio.pizzas[index];
  const selects = document.querySelectorAll(`[data-pizza-index="${index}"] .pizza-flavor-select`);
  const sabores = [pizza.nome];

  selects.forEach(select => {
    if (select.value) sabores.push(select.value);
  });

  return sabores;
}

function montarDescricaoPizza(pizza, sabores = []) {
  const adicional = calcularAdicionalStrogonoff(sabores);

  if (adicional > 0) {
    return `Adicional de Strogonoff: ${formatarPreco(adicional)}`;
  }

  return sabores.length > 1 ? "Pizza montada com mais de um sabor" : pizza.descricao || "";
}

function atualizarSaboresPizza(index) {
  const card = document.querySelector(`[data-pizza-index="${index}"]`);
  const tamanhoSelecionado = card ? card.querySelector(".size-btn.active") : null;
  const terceiroSabor = card ? card.querySelector("[data-terceiro-sabor]") : null;
  const terceiroSelect = terceiroSabor ? terceiroSabor.querySelector("select") : null;
  const info = document.getElementById(`pizza-sabores-info-${index}`);
  const precoEl = document.getElementById(`pizza-preco-${index}`);

  if (!card || !tamanhoSelecionado) return;

  let sabores = obterSaboresPizzaSelecionados(index);
  let limite = obterLimiteSaboresPizza(tamanhoSelecionado.dataset.tamanho, sabores);
  let permiteTerceiro = limite >= 3;

  if (terceiroSabor) {
    terceiroSabor.hidden = !permiteTerceiro;
  }

  if (!permiteTerceiro && terceiroSelect) {
    terceiroSelect.value = "";
    sabores = obterSaboresPizzaSelecionados(index);
    limite = obterLimiteSaboresPizza(tamanhoSelecionado.dataset.tamanho, sabores);
    permiteTerceiro = limite >= 3;
  }

  if (precoEl) {
    precoEl.textContent = formatarPreco(calcularPrecoPizza(tamanhoSelecionado.dataset.preco, sabores));
  }

  if (info) {
    const adicional = calcularAdicionalStrogonoff(sabores);
    const textoLimite = permiteTerceiro
      ? "Este tamanho permite ate 3 sabores."
      : "Este tamanho permite ate 2 sabores.";

    info.textContent = adicional > 0
      ? `${textoLimite} Adicional Strogonoff: ${formatarPreco(adicional)}.`
      : textoLimite;
  }
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

function obterOpcaoPastelSelecionada() {
  return OPCOES_PASTEL[0];
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

function configurarMenuCategoriasFixo() {
  const menu = document.querySelector(".menu-sections");
  const header = document.querySelector(".header");

  if (!menu || !header) return;

  const marcador = document.createElement("div");
  marcador.className = "menu-sections-marker";
  menu.parentNode.insertBefore(marcador, menu);

  function obterAlturaHeader() {
    return Math.round(header.getBoundingClientRect().height);
  }

  function atualizarMenuFixo() {
    const topoFixo = obterAlturaHeader();
    const marcadorTopo = marcador.getBoundingClientRect().top;
    const deveFixar = marcadorTopo <= topoFixo;

    document.documentElement.style.setProperty("--menu-fixed-top", `${topoFixo}px`);
    marcador.style.height = deveFixar ? `${menu.offsetHeight}px` : "0px";
    menu.classList.toggle("is-fixed", deveFixar);
  }

  atualizarMenuFixo();
  window.addEventListener("scroll", atualizarMenuFixo, { passive: true });
  window.addEventListener("resize", atualizarMenuFixo);
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
  const grupos = document.querySelectorAll(".menu-section, .pizza-group, .bebida-group");

  document.querySelectorAll(".product-card, .sabor-item, .drink-card").forEach(item => {
    const texto = item.dataset.search || normalizarBusca(item.textContent);
    item.classList.toggle("is-hidden", termo && !texto.includes(termo));
  });

  grupos.forEach(grupo => {
    const itens = grupo.querySelectorAll(".product-card, .sabor-item, .drink-card");
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
    nome: `${opcao.nome} (${sabores.join(", ")})`,
    descricao: "Pastel montado pelo cliente",
    preco: opcao.preco
  });
}
