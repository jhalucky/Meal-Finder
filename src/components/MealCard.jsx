import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  return (
    <div className="bg-black dark:bg-white rounded-lg shadow-lg pt-3 px-3  justify-center items-center overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="w-full overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4 space-y-3 text-white dark:text-black">
        <h3 className="text-xl font-bold line-clamp-2">
          {meal.strMeal}
        </h3>
        
        <p className="font-medium">
          <span className="font-semibold">Category:</span> {meal.strCategory}
        </p>
        
    
        <p className="font-medium">
          <span className="font-semibold">Origin:</span> {meal.strArea}
        </p>

       <div className="flex justify-center items-center mt-4">
        <Link
          to={`/meals/${meal.idMeal}`}
          className="bg-red-600 hover:bg-red-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-300"
        >
          View Recipe
        </Link>
        </div>
      </div>
    </div>
  );
}