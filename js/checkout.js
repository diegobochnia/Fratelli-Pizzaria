document.addEventListener("DOMContentLoaded", () => {
  const tipo = document.getElementById("tipo");
  const camposEntrega = document.getElementById("campos-entrega");

  if (!tipo || !camposEntrega) return;

  function atualizarCampos() {
    camposEntrega.style.display = tipo.value === "Entrega" ? "block" : "none";

    if (typeof renderizarCarrinho === "function") {
      renderizarCarrinho();
    }
  }

  tipo.addEventListener("change", atualizarCampos);
  atualizarCampos();
});
