import Socials from "./Socials";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black mt-12 border-t">
      <div className=" mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-amber-600 mb-2">MEAL FINDER</h3>
          <p className="text-gray-400 mb-4">
            Discover delicious recipes from around the world
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
            <span>Powered by TheMealDB API</span>
            <span>•</span>
            <span>© 2025 Meal Finder</span>
             <span>•</span>
            <span>Developed by Lucky Jha</span>
            <span><Socials /></span>
          </div>
        </div>
      </div>
    </footer>
  );
}