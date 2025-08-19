import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Meal Name */}
        <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
          {meal.strMeal}
        </h3>
        
        {/* Category */}
        <p className="text-gray-600 font-medium">
          <span className="font-semibold">Category:</span> {meal.strCategory}
        </p>
        
        {/* Origin Country */}
        <p className="text-gray-600 font-medium">
          <span className="font-semibold">Origin:</span> {meal.strArea}
        </p>
        
        {/* View Recipe Button */}
        <Link
          to={`/meals/${meal.idMeal}`}
          className="block w-full bg-red-600 hover:bg-red-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-300 mt-4"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}