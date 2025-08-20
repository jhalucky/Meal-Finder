// Option 1: Use your backend (set USE_LOCAL_API to true)
// Option 2: Use TheMealDB (set USE_LOCAL_API to false)
const USE_LOCAL_API = false;

const BASE_URL = USE_LOCAL_API 
  ? "http://localhost:5000/api/json/v1/1"
  : "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipe(query) {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`)
    const data = await res.json();
    return data.meals;
}

export const getRandomMeals = async (count = 6) => {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(
      fetch(`${BASE_URL}/random.php`)
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

// NEW: Backend-only functions for custom features
export async function addCustomMeal(mealData) {
    if (!USE_LOCAL_API) {
        throw new Error('Custom meals can only be added when using local API');
    }
    
    const res = await fetch('http://localhost:5000/api/meals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mealData)
    });
    
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to add custom meal');
    }
    
    return data;
}

// Helper function to switch APIs
export function switchAPI(useLocal = false) {
    USE_LOCAL_API = useLocal;
    console.log(`Switched to ${useLocal ? 'Local Backend' : 'TheMealDB'} API`);
}

// Get current API info
export function getAPIInfo() {
    return {
        isLocal: USE_LOCAL_API,
        baseUrl: BASE_URL,
        name: USE_LOCAL_API ? 'Local Backend' : 'TheMealDB'
    };
}