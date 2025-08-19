import MealCard from "./MealCard";

export default function MealList({ meals }) {
  if (!meals || meals.length === 0) {
    return (
      <div className="flex items-center justify-center mt-20">
        <p className="text-gray-400 text-xl">No meals found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-6">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}