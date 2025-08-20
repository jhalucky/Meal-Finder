// api.js

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function fetchRecipe(query) {
  const res = await fetch(`${BASE_URL}/search?q=${query}`);
  return res.json();
}

export async function getRandomMeals(count = 6) {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(fetch(`${BASE_URL}/random`).then(res => res.json()));
  }
  return Promise.all(promises);
}

export async function getMealById(id) {
  const res = await fetch(`${BASE_URL}/meal/${id}`);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
}

