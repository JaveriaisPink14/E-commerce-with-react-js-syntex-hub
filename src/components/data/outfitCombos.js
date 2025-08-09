import product1 from '../Assets/product1.jpg';   // T-shirt (Men)
import product3 from '../Assets/product3.jpg';   // Trousers (Men)
import product5 from '../Assets/product5.jpg';   // Cargo pants (Men)
import product11 from '../Assets/product11.jpg'; // Kurti (Women)
import product13 from '../Assets/product13.jpg'; // Hoodie (Women)
import product17 from '../Assets/product17.jpg'; // Stylish shirt (Women)
import product20 from '../Assets/product20.jpg'; // Women's jeans
import product22 from '../Assets/product22.jpg'; // Sports Cap (Women)
import product34 from '../Assets/product34.jpg'; // Flip Flops (Kids)

const outfitCombos = [
  // MEN
  {
    category: "Men",
    vibe: "relaxed",
    top: { name: "Casual T-Shirt", image: product1, price: 1200, id: 1 },
    bottom: { name: "Slim Trousers", image: product3, price: 1800, id: 3 },
    shoes: { name: "Flip Flops", image: product34, price: 600, id: 34 },
    comment: "A cool and relaxed vibe perfect for weekends.",
    matchScore: 88
  },
  {
    category: "Men",
    vibe: "bold",
    top: { name: "Casual T-Shirt", image: product1, price: 1200, id: 1 },
    bottom: { name: "Cargo Pants", image: product5, price: 1900, id: 5 },
    shoes: { name: "Flip Flops", image: product34, price: 600, id: 34 },
    comment: "Street-style inspiration for confident moods.",
    matchScore: 90
  },

  // WOMEN
  {
    category: "Women",
    vibe: "comfortable",
    top: { name: "Olive Hoodie", image: product13, price: 2500, id: 13 },
    bottom: { name: "Women's Jeans", image: product20, price: 2100, id: 20 },
    shoes: { name: "Stylish Cap", image: product22, price: 900, id: 22 },
    comment: "Stay cozy and trendy on breezy days.",
    matchScore: 93
  },
  {
    category: "Women",
    vibe: "bold",
    top: { name: "Stylish Kurti", image: product11, price: 1700, id: 11 },
    bottom: { name: "Cargo Pants", image: product5, price: 1900, id: 5 },
    shoes: { name: "Designer Shirt", image: product17, price: 3000, id: 17 },
    comment: "Fusion look for festive events or a chic outing.",
    matchScore: 96
  },
  {
    category: "Women",
    vibe: "stylish",
    top: { name: "Stylish Shirt", image: product17, price: 3000, id: 17 },
    bottom: { name: "Women's Jeans", image: product20, price: 2100, id: 20 },
    shoes: { name: "Sports Cap", image: product22, price: 900, id: 22 },
    comment: "Smart casual with a confident twist.",
    matchScore: 91
  },

  // KIDS
  {
    category: "Kids",
    vibe: "playful",
    top: { name: "Casual T-Shirt", image: product1, price: 1200, id: 1 },
    bottom: { name: "Cargo Pants", image: product5, price: 1900, id: 5 },
    shoes: { name: "Flip Flops", image: product34, price: 600, id: 34 },
    comment: "Easy and playful for all-day comfort.",
    matchScore: 89
  },
  {
    category: "Kids",
    vibe: "relaxed",
    top: { name: "Stylish Shirt", image: product17, price: 3000, id: 17 },
    bottom: { name: "Slim Trousers", image: product3, price: 1800, id: 3 },
    shoes: { name: "Flip Flops", image: product34, price: 600, id: 34 },
    comment: "A soft and light outfit combo for outdoor fun.",
    matchScore: 86
  }
];

export default outfitCombos;
