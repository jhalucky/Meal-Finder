import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { getMealById } from "../apis/api";

export default function ViewRecipe() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setError("");
            setLoading(true);
            try {
                const data = await getMealById(id);
                if (!cancelled) {
                    setMeal(data);
                }
                if (!data && !cancelled) {
                    setError("Meal not found");
                }
            } catch (error) {
                if (!cancelled) {
                    setError(error.message || "Failed to fetch recipe");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const ingredients = useMemo(() => {
        if (!meal) return [];
        const list = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                list.push({ ingredient, measure });
            }
        }
        return list; 
    }, [meal]);

    // Function to convert instructions into bullet points
    const formatInstructions = (instructions) => {
        if (!instructions) return [];
        return instructions
            .split(/\.\s+/)
            .filter(step => step.trim().length > 0)
            .map(step => step.trim() + (step.endsWith('.') ? '' : '.'));
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center space-y-4">
            <Link to="/" className="text-red-500 hover:text-red-400 transition-colors">Go back</Link>
            <p className="text-red-400">Error fetching recipe: {error}</p>
        </div>
    );
    
    if (!meal) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <p className="text-white text-xl">Recipe not found</p>
        </div>
    );

    return (
        <div className="min-h-screen p-2">
            <div className="max-w mx-auto">
                {/* Go Back Button */}
                <Link to="/" className="inline-flex items-center space-x-2 text-red-600  hover:text-red-400 transition-colors duration-300 mb-5 text-lg font-medium">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span>Go back</span>
                </Link>

                {/* Recipe Card - Image and Name Only */}
                <div className="bg-white rounded-3xl justify-center items-center overflow-hidden shadow-2xl border border-gray-800 mb-8 max-w-md mx-auto p-5">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full object-cover rounded-2xl"
                    />
                    <div className="mt-3 text-center">
                        <h2 className="text-3xl font-bold text-black meal-name">
                            {meal.strMeal}
                        </h2>
                    </div>
                    <div className="justify-center items-center text-center mt-4">
                        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500">
                            Watch Video
                        </a>
                    </div>
                </div>

                {/* Instructions Section */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-red-500 mb-6 border-b border-gray-700 pb-2">
                        Instructions
                    </h3>
                    <ul className="text-gray-300 leading-relaxed text-lg space-y-4">
                        {formatInstructions(meal.strInstructions).map((step, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-4 mt-1 text-xl">•</span>
                                <span>{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Ingredients Section */}
                <div>
                    <h3 className="text-2xl font-bold text-red-500 mb-6 border-b border-gray-700 pb-2">
                        Ingredients
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {ingredients.map(({ ingredient, measure }, index) => (
                            <div key={index} className="rounded-lg px-4 py-3 flex justify-between items-center border border-gray-700 hover:bg-gray-750 transition-colors">
                                <span className="text-white font-medium">{ingredient}</span>
                                <span className="text-gray-400">{measure}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
