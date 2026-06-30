function enviarWhatsApp() {
  const telefoneWhatsApp = "5542999520203";

  const nome = document.getElementById("nome").value.trim();
  const tipo = document.getElementById("tipo").value;
  const endereco = document.getElementById("endereco").value.trim();
  const perimetro = document.getElementById("perimetro").value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!nome) {
    alert("Informe seu nome.");
    return;
  }

  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  if (tipo === "Entrega" && !endereco) {
    alert("Informe o endereço para entrega.");
    return;
  }

  let pedidos = "";
  let subtotalPedido = 0;

  cart.forEach((item, index) => {
    const quantidade = Number(item.quantidade || 1);
    const preco = Number(item.preco || 0);
    const subtotal = preco * quantidade;

    subtotalPedido += subtotal;
    pedidos += `${index + 1}. ${quantidade}x ${item.nome} - ${formatarPreco(subtotal)}`;

    if (quantidade > 1) {
      pedidos += ` (${formatarPreco(preco)} cada)`;
    }

    pedidos += "\n";
  });

  const frete = tipo === "Entrega" && perimetro.includes("Fora") ? 8 : 0;
  const total = subtotalPedido + frete;
  const temBebida = cart.some(item => item.tipo === "bebida" || item.categoria);

  const textoEntrega = tipo === "Entrega"
    ? `Endereço: ${endereco}\nÁrea: ${perimetro}\n`
    : "Retirada no local\n";

  const textoFrete = frete > 0
    ? `FRETE: ${formatarPreco(frete)}\n`
    : "";

  const textoBebidas = temBebida
    ? "OBSERVAÇÃO: verificar disponibilidade das bebidas escolhidas no estoque.\n"
    : "";

  const chavePix = "15486388000150";

  const mensagem =
`🍕 NOVO PEDIDO

Nome: ${nome}
Tipo: ${tipo}
${textoEntrega}
PEDIDO:
${pedidos}
${textoBebidas}
SUBTOTAL: ${formatarPreco(subtotalPedido)}
${textoFrete}TOTAL: ${formatarPreco(total)}

PAGAMENTO VIA PIX:

Chave Pix CNPJ: 
${chavePix}

Copie a chave acima, faça o pagamento e envie o comprovante por aqui.
Caso prefira pagar de outra forma, informe no WhatsApp.`;

  const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}
