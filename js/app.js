function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  const body = document.body;

  if (!menu) return;

  menu.classList.toggle("open");
  body.classList.toggle("menu-open", menu.classList.contains("open"));
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;

  menu.classList.remove("open");
  document.body.classList.remove("menu-open");
}

function setupActiveLinks() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".desktop-menu a, .mobile-menu a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function getCartQuantity() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    return cart.reduce((total, item) => {
      return total + Number(item.quantidade || 0);
    }, 0);
  } catch (error) {
    return 0;
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll("[data-cart-count]");
  const quantity = getCartQuantity();

  badges.forEach(badge => {
    badge.textContent = quantity > 99 ? "99+" : String(quantity);
    badge.classList.toggle("show", quantity > 0);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupActiveLinks();
  setupRevealAnimations();
  updateCartBadge();
});

window.addEventListener("storage", event => {
  if (event.key === "cart") {
    updateCartBadge();
  }
});
