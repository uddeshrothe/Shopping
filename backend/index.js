const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PRICES = {
  Apple: 35,
  Banana: 20,
  Melon: 50,
  Lime: 15,
};

function calculateTotal(items) {
  const counts = items.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  
  let total = 0;

  for (const [item, count] of Object.entries(counts)) {
    switch (item) {
      case 'Apple':
      case 'Banana':
        total += count * PRICES[item];
        break;
      case 'Melon':
        total += Math.ceil(count / 2) * PRICES.Melon;
        break;
      case 'Lime':
        total += (Math.floor(count / 3) * 2 + count % 3) * PRICES.Lime;
        break;
    }
  }

  return `${(total / 100).toFixed(2)} p`;
}

app.post('/calculate', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ error: 'Invalid input' });

  const total = calculateTotal(items);
  res.json({ total });
});

app.listen(4000, () => console.log('Server running on port 4000'));
