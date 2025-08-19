import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import MealList from "./components/MealList";
import ViewRecipe from "./components/ViewRecipe";
import { getRandomMeals } from "./apis/api";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRandomMeals() {
      try {
        const randomMeals = await getRandomMeals(12);
        setMeals(randomMeals);
      } catch (error) {
        console.error("Failed to load random meals:", error);
      } finally {
        setLoading(false);
      }
    }
    loadRandomMeals();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className=" bg-background text-foreground min-h-screen mx-auto">
        <Router>
          <div className="p-4 flex flex-col justify-center">
            <Routes>
              <Route 
                path="/" 
                element={
                  <>
                    <SearchBar onSearch={setMeals} />
                    {loading ? (
                      <div className="flex items-center justify-center mt-20">
                        <div className="text-xl">Loading random meals...</div>
                      </div>
                    ) : (
                      <MealList meals={meals} />
                    )}
                  </>
                } 
              />
              <Route path="/meals/:id" element={<ViewRecipe />} />
            </Routes>
          </div>                                          
        </Router>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;