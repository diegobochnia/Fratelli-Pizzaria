function enviarWhatsApp() {
  const telefoneWhatsApp = "5541995051301";

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
  let total = 0;

  cart.forEach((item, index) => {
    total += Number(item.preco || 0);
    pedidos += `${index + 1}. ${item.nome} - ${formatarPreco(item.preco)}\n`;
  });

  const textoEntrega = tipo === "Entrega"
    ? `Endereço: ${endereco}\nÁrea: ${perimetro}\n`
    : "Retirada no local\n";

  const mensagem =
`🍕 NOVO PEDIDO

Nome: ${nome}
Tipo: ${tipo}
${textoEntrega}
PEDIDO:
${pedidos}
TOTAL: ${formatarPreco(total)}

Pagamento a combinar pelo WhatsApp.`;

  const url = `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}