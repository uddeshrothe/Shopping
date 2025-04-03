// function calculateBasketPrice(basket) {
//     const prices = {
//       "Apple": 35,
//       "Banana": 20,
//       "Melon": 50,
//       "Lime": 15,
//     };
  
//     const itemCounts = {};
//     basket.forEach((item) => {
//       itemCounts[item] = (itemCounts[item] || 0) + 1;
//     });
  
//     let totalPrice = 0;
  
//     for (const item in itemCounts) {
//       const count = itemCounts[item];
//       if (item === "Melon") {
//         totalPrice += Math.floor(count / 2) * prices[item] + (count % 2) * prices[item];
//       } else if (item === "Lime") {
//         totalPrice += Math.floor(count / 3) * 2 * prices[item] + (count % 3) * prices[item];
//       } else {
//         totalPrice += count * prices[item];
//       }
//     }
  
//     return totalPrice;
//   }
  
//   // Example usage:
//   const basket1 = ["Apple", "Apple", "Banana"];
//   const basket2 = ["Melon", "Melon", "Melon", "Lime", "Lime", "Lime", "Lime", "Apple"];
//   const basket3 = [];
//   const basket4 = ["Apple", "Banana", "Melon", "Lime"];
  
//   console.log(`Basket 1 price: ${calculateBasketPrice(basket1)}p`); // Output: 90p
//   console.log(`Basket 2 price: ${calculateBasketPrice(basket2)}p`); // Output: 245p
//   console.log(`Basket 3 price: ${calculateBasketPrice(basket3)}p`); // Output: 0p
//   console.log(`Basket 4 price: ${calculateBasketPrice(basket4)}p`); // Output: 120p

// class Basket {
//     constructor() {
//         this.prices = {
//             'Apple': 35,
//             'Banana': 20,
//             'Melon': 50,
//             'Lime': 15
//         };
//         this.offers = {
//             'Melon': { buy: 2, pay: 1 },
//             'Lime': { buy: 3, pay: 2 }
//         };
//         this.items = {};
//     }

//     addItem(item) {
//         this.items[item] = (this.items[item] || 0) + 1;
//     }

//     calculateTotal() {
//         let total = 0;
//         for (let item in this.items) {
//             let count = this.items[item];
//             if (this.offers[item]) {
//                 let offer = this.offers[item];
//                 let sets = Math.floor(count / offer.buy);
//                 let remaining = count % offer.buy;
//                 total += (sets * offer.pay + remaining) * this.prices[item];
//             } else {
//                 total += count * this.prices[item];
//             }
//         }
//         return `Total: ${total}p`;
//     }
// }

// // Example usage
// const basket = new Basket();
// ['Apple', 'Apple', 'Banana', 'Melon', 'Melon', 'Lime', 'Lime'].forEach(item => basket.addItem(item));

// console.log(basket.calculateTotal());

function calculateTotalCartAmount(basket) {
    const prices = { Apple: 35, Banana: 20, Melon: 50, Lime: 15 };
    const offers = { Melon: [2, 1], Lime: [3, 2] };
    
    let itemCounts = {};
    for (let item of basket) {
        itemCounts[item] = (itemCounts[item] || 0) + 1;
    }
    
    let total = 0;
    for (let item in itemCounts) {
        let count = itemCounts[item];
        if (offers[item]) {
            let [buy, pay] = offers[item];
            count = Math.floor(count / buy) * pay + (count % buy);
        }
        total += count * prices[item];
    }
    
    return `Total: ${total}p`;
}

// Example 
console.log(calculateTotalCartAmount(['Apple', 'Apple', 'Banana', 'Melon', 'Melon', 'Lime', 'Lime', 'Lime'])); // Total: 170p

console.log(calculateTotalCartAmount(['Apple', 'Banana', 'Lime', 'Lime'])); // Total: 85p