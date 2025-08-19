
const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipe(query) {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`)
    const data = await res.json();
    return data.meals;
}

export const getRandomMeals = async (count = 6) => {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(
      fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => data.meals[0])
    );
  }
  return Promise.all(promises);
};

export async function getMealById(id) {
    const res = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
    const data = await res.json();
    return data.meals? data.meals[0]: null;
}

export async function getCategories() {
    const res = await fetch(`${BASE_URL}/categories.php`);
    const data = await res.json();
    return data.categories || [];
}