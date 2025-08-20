import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for all requests
app.use(cors());

// If you want to allow only your frontend (safer), do this:
// app.use(cors({ origin: "http://localhost:5173" }));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("🍔 Meal API Backend is running!");
});

app.get("/random", async (req, res) => {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await response.json();
    res.json(data.meals[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch random meal" });
  }
});

app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to search meals" });
  }
});

app.get("/meal/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meal details" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
