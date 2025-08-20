import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Search meal by name
app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await response.json();
    res.json(data.meals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
});

// Get random meals
app.get("/api/random", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/random.php`);
    const data = await response.json();
    res.json(data.meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random meal" });
  }
});

// Get meal by ID
app.get("/api/meal/:id", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/lookup.php?i=${req.params.id}`);
    const data = await response.json();
    res.json(data.meals ? data.meals[0] : null);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meal by ID" });
  }
});

// Get categories
app.get("/api/categories", async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/categories.php`);
    const data = await response.json();
    res.json(data.categories || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
