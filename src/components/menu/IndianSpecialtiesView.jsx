
import React from "react";
import MealSection from "./MealSection";

const IndianSpecialtiesView = ({ indianDishes, onAddToCart }) => {
  // Sort dishes to put Chilly Parotta at the beginning if it exists
  const sortedDishes = [...indianDishes].sort((a, b) => {
    if (a.name === "Chilly Parotta") return -1;
    if (b.name === "Chilly Parotta") return 1;
    return 0;
  });

  return (
    <MealSection
      title="Indian Specialties"
      dishes={sortedDishes}
      onAddToCart={onAddToCart}
    />
  );
};

export default IndianSpecialtiesView;
