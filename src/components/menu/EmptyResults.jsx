
import React from "react";
import { Button } from "@/components/ui/button";

const EmptyResults = ({ setSearchQuery, setActiveCategory }) => {
  const handleShowAll = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  const handleShowIndian = () => {
    setSearchQuery("");
    setActiveCategory("indian");
  };

  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900 mb-3">No dishes found</h3>
      <p className="mt-2 text-gray-500 mb-6">
        Try adjusting your search or filter criteria, or check out our new dishes.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Button onClick={handleShowAll} variant="outline">
          Show All Dishes
        </Button>
        <Button onClick={handleShowIndian} className="bg-green-600 hover:bg-green-700">
          Try Our New Chilly Parotta
        </Button>
      </div>
    </div>
  );
};

export default EmptyResults;
