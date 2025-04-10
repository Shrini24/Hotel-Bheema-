
import React from "react";
import MealSection from "./MealSection";

const AllCategoriesView = ({ mealSections, onAddToCart, setActiveCategory }) => {
  return (
    <>
      {/* Indian Specialties Section */}
      {mealSections.indian.length > 0 && (
        <MealSection
          title="Indian Specialties"
          dishes={mealSections.indian.filter((_, index) => index < 3)}
          onAddToCart={onAddToCart}
          showViewAllButton={mealSections.indian.length > 3}
          onViewAll={() => setActiveCategory("indian")}
        />
      )}

      {/* Breakfast Section */}
      {mealSections.breakfast.length > 0 && (
        <MealSection
          title="Breakfast"
          dishes={mealSections.breakfast.filter(dish => dish.categoryId !== "indian")}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Lunch Section */}
      {mealSections.lunch.length > 0 && mealSections.lunch.filter(dish => dish.categoryId !== "indian").length > 0 && (
        <MealSection
          title="Lunch"
          dishes={mealSections.lunch.filter(dish => dish.categoryId !== "indian")}
          onAddToCart={onAddToCart}
        />
      )}

      {/* Dinner Section */}
      {mealSections.dinner.length > 0 && mealSections.dinner.filter(dish => dish.categoryId !== "indian").length > 0 && (
        <MealSection
          title="Dinner"
          dishes={mealSections.dinner.filter(dish => dish.categoryId !== "indian")}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default AllCategoriesView;
