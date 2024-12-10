const productGrid = document.getElementById("product-grid");
const categoryFilter = document.getElementById("category");
const sortFilter = document.getElementById("sort");

function filterAndSortProducts() {
  const category = categoryFilter.value;
  const sortOption = sortFilter.value;

  // Get all product cards
  const productCards = Array.from(productGrid.children);

  // Filter products by category
  productCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  // Sort products
  const sortedCards = productCards
    .filter((card) => card.style.display === "block")
    .sort((a, b) => {
      const aPrice = parseFloat(a.getAttribute("data-price"));
      const bPrice = parseFloat(b.getAttribute("data-price"));
      const aRating = parseFloat(a.getAttribute("data-rating"));
      const bRating = parseFloat(b.getAttribute("data-rating"));

      if (sortOption === "price") {
        return aPrice - bPrice;
      } else if (sortOption === "rating") {
        return bRating - aRating;
      }
    });

  // Reorder the product grid
  sortedCards.forEach((card) => productGrid.appendChild(card));
}

// Event listeners
categoryFilter.addEventListener("change", filterAndSortProducts);
sortFilter.addEventListener("change", filterAndSortProducts);

// Initial render
filterAndSortProducts();