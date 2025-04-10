
import React from "react";
import MealSection from "./MealSection";

const IndianSpecialtiesView = ({ indianDishes, onAddToCart }) => {
  return (
    <MealSection
      title="Indian Specialties"
      dishes={indianDishes}
      onAddToCart={onAddToCart}
    />
  );
};

export default IndianSpecialtiesView;
