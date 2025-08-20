import { useState } from "react";
import { fetchRecipe } from "../apis/api";
import { ModeToggle } from "./Toggle";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipe(query);
      onSearch(data || []);
      if (data && data.length === 0) {
        setError("No recipes found. Try a different search term.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch recipes");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="border-gray-800 py-6 px-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4">
        {/* Header with title and mobile toggle */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-amber-600 tracking-wider meal-finder">MEAL FINDER</h1>
          {/* Toggle button - visible only on mobile */}
          <div className="sm:hidden">
            <ModeToggle />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search meal (e.g., Chicken, Pasta, Pizza)"
            className="w-full sm:w-80 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
          />
          <div className="flex gap-4">
            <button 
              type="submit" 
              onClick={handleSubmit} 
              disabled={loading} 
              className="flex-1 sm:flex-initial bg-amber-600 hover:bg-red-200 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <div className="hidden sm:block">
              <ModeToggle />
            </div>
          </div>
        </form>
      </div>
      
      {error && (
        <div className="flex justify-end">
          <p className="text-red-400 text-sm bg-red-900/20 px-4 py-2 rounded-lg border border-red-800">{error}</p>
        </div>
      )}
    </div>
  );
}