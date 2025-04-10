
import React from "react";

const EmptyResults = () => {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">No dishes found</h3>
      <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
    </div>
  );
};

export default EmptyResults;
