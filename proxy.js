import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = 'be5f64db33b14cbea6af3d2e8d3e70b0';

app.get('/api/games', async (req, res) => {
  try {
    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Ошибка при запросе к RAWG API:', err);
    res.status(500).json({ error: 'Ошибка при запросе к RAWG API' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Прокси-сервер запущен на http://localhost:${PORT}`));
