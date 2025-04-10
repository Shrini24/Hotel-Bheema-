
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import DishCard from "@/components/dishes/DishCard";
import CategoryTabs from "@/components/dishes/CategoryTabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Sample data with meal types
const categories = [
  { id: "all", name: "All" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "indian", name: "Indian Specialties" },
];

const dishes = [
  {
    id: "1",
    name: "Paneer Butter Masala",
    description: "Soft paneer cubes simmered in a rich, creamy tomato sauce flavored with butter and aromatic spices.",
    price: 299.99,
    image: "public/lovable-uploads/8877e892-9736-4510-8f2e-af139e9e287e.png",
    categoryId: "indian",
    mealType: "dinner",
    dietary: ["Vegetarian"]
  },
  {
    id: "2",
    name: "Chicken 65",
    description: "Spicy, deep-fried chicken chunks marinated with ginger, garlic, red chilies and aromatic spices. A popular South Indian appetizer.",
    price: 349.50,
    image: "public/lovable-uploads/209119b3-e95b-4f4a-bed7-8f9f8fa6c956.png",
    categoryId: "indian",
    mealType: "lunch",
    dietary: ["Spicy", "Protein Rich"]
  },
  {
    id: "3",
    name: "Chicken Curry",
    description: "Tender chicken pieces cooked in a flavorful gravy with onions, tomatoes, and traditional Indian spice blend.",
    price: 329.99,
    image: "public/lovable-uploads/896f21a9-dc46-47cb-b4df-9b848f8cd5bd.png",
    categoryId: "indian",
    mealType: "dinner",
    dietary: ["Protein Rich"]
  },
  {
    id: "4",
    name: "Chilli Chicken",
    description: "Indo-Chinese specialty with crispy chicken tossed in a spicy sauce with bell peppers and green chilies.",
    price: 329.50,
    image: "public/lovable-uploads/2d57d03b-d3e4-430a-8230-262e0ea6c51f.png",
    categoryId: "indian",
    mealType: "lunch",
    dietary: ["Spicy", "Indo-Chinese"]
  },
  {
    id: "5",
    name: "Mutton Seekh Kebab",
    description: "Minced lamb mixed with herbs and spices, skewered and grilled to perfection. Served with mint chutney.",
    price: 399.99,
    image: "public/lovable-uploads/81827a18-6710-4b47-8b3c-7758c22bb780.png",
    categoryId: "indian",
    mealType: "dinner",
    dietary: ["Protein Rich"]
  },
  {
    id: "6",
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with marinated chicken pieces, saffron, and aromatic spices. Served with raita.",
    price: 349.00,
    image: "public/lovable-uploads/cd78d480-6b96-4d0f-8d18-0993717f1e5d.png",
    categoryId: "indian",
    mealType: "lunch",
    dietary: ["Signature Dish"]
  },
  {
    id: "7",
    name: "Vegetable Pakora",
    description: "Mixed vegetables dipped in spiced gram flour batter and deep-fried. Served with tamarind and mint chutneys.",
    price: 199.99,
    image: "public/lovable-uploads/a366f4a5-7fde-44ba-bcf9-81fa4436dbdf.png",
    categoryId: "indian",
    mealType: "breakfast",
    dietary: ["Vegetarian", "Vegan"]
  },
  {
    id: "8",
    name: "Avocado Toast",
    description: "Multigrain toast topped with smashed avocado, poached eggs, and microgreens.",
    price: 249.50,
    image: "https://images.unsplash.com/photo-1603046891744-1f76ace3f196?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww",
    categoryId: "breakfast",
    mealType: "breakfast",
    dietary: ["Vegetarian"]
  },
  {
    id: "9",
    name: "Masala Dosa",
    description: "Crispy rice and lentil crepe filled with spiced potato filling. Served with coconut chutney and sambar.",
    price: 199.50,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D",
    categoryId: "indian",
    mealType: "breakfast",
    dietary: ["Vegetarian", "South Indian"]
  },
  {
    id: "10",
    name: "Butter Chicken",
    description: "Tender chicken cooked in a creamy tomato sauce with butter and aromatic spices. A North Indian classic.",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnV0dGVyJTIwY2hpY2tlbnxlbnwwfHwwfHx8MA%3D%3D",
    categoryId: "indian",
    mealType: "dinner",
    dietary: ["Signature Dish"]
  }
];

// Main Menu component
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Log for debugging - mimicking "human" development style
  console.log("Menu rendering with category:", activeCategory);

  const handleAddToCart = (id) => {
    // Some developers might add a log here
    console.log('Adding to cart:', id);
    
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  // Filter dishes based on search query and active category
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === "all" || dish.mealType === activeCategory || 
                           (activeCategory === "indian" && dish.categoryId === "indian");
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group dishes by meal type for display
  const mealSections = {
    breakfast: filteredDishes.filter(dish => dish.mealType === "breakfast"),
    lunch: filteredDishes.filter(dish => dish.mealType === "lunch"),
    dinner: filteredDishes.filter(dish => dish.mealType === "dinner"),
    indian: filteredDishes.filter(dish => dish.categoryId === "indian")
  };

  // Only show sections that have dishes when filtering
  const visibleSections = Object.entries(mealSections)
    .filter(([sectionName, dishes]) => {
      if (activeCategory === "all") return dishes.length > 0;
      if (activeCategory === "indian") return sectionName === "indian" && dishes.length > 0;
      return sectionName === activeCategory && dishes.length > 0;
    });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold mb-3 text-green-700">Our Menu</h1>
          <p className="text-gray-600 max-w-3xl">
            Discover our exquisite selection of dishes including authentic Indian specialties crafted by our award-winning chefs. 
            All meals are prepared with the freshest ingredients and can be delivered 
            directly to your room.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="search"
              placeholder="Search dishes..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex-grow overflow-hidden">
            <CategoryTabs 
              categories={categories} 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </div>

        {visibleSections.length > 0 ? (
          <div className="space-y-12">
            {activeCategory === "indian" && (
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="h-1 bg-green-500 flex-grow mr-4"></div>
                  <h2 className="text-2xl font-serif font-semibold text-green-700">Indian Specialties</h2>
                  <div className="h-1 bg-green-500 flex-grow ml-4"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mealSections.indian.map((dish) => (
                    <DishCard
                      key={dish.id}
                      id={dish.id}
                      name={dish.name}
                      description={dish.description}
                      price={dish.price}
                      image={dish.image}
                      category={dish.categoryId === "indian" ? "Indian" : dish.mealType}
                      dietary={dish.dietary}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeCategory === "all" && (
              <>
                {/* Indian Specialties Section */}
                {mealSections.indian.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="h-1 bg-green-500 flex-grow mr-4"></div>
                      <h2 className="text-2xl font-serif font-semibold text-green-700">Indian Specialties</h2>
                      <div className="h-1 bg-green-500 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mealSections.indian.filter((_, index) => index < 3).map((dish) => (
                        <DishCard
                          key={dish.id}
                          id={dish.id}
                          name={dish.name}
                          description={dish.description}
                          price={dish.price}
                          image={dish.image}
                          category={"Indian"}
                          dietary={dish.dietary}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                    {mealSections.indian.length > 3 && (
                      <div className="text-center mt-4">
                        <Button 
                          variant="outline" 
                          className="border-green-300 text-green-700" 
                          onClick={() => setActiveCategory("indian")}
                        >
                          View All Indian Dishes
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Breakfast Section */}
                {mealSections.breakfast.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="h-1 bg-green-500 flex-grow mr-4"></div>
                      <h2 className="text-2xl font-serif font-semibold text-green-700">Breakfast</h2>
                      <div className="h-1 bg-green-500 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mealSections.breakfast.filter(dish => dish.categoryId !== "indian").map((dish) => (
                        <DishCard
                          key={dish.id}
                          id={dish.id}
                          name={dish.name}
                          description={dish.description}
                          price={dish.price}
                          image={dish.image}
                          category={dish.mealType}
                          dietary={dish.dietary}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Lunch Section */}
                {mealSections.lunch.length > 0 && mealSections.lunch.filter(dish => dish.categoryId !== "indian").length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="h-1 bg-green-500 flex-grow mr-4"></div>
                      <h2 className="text-2xl font-serif font-semibold text-green-700">Lunch</h2>
                      <div className="h-1 bg-green-500 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mealSections.lunch.filter(dish => dish.categoryId !== "indian").map((dish) => (
                        <DishCard
                          key={dish.id}
                          id={dish.id}
                          name={dish.name}
                          description={dish.description}
                          price={dish.price}
                          image={dish.image}
                          category={dish.mealType}
                          dietary={dish.dietary}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Dinner Section */}
                {mealSections.dinner.length > 0 && mealSections.dinner.filter(dish => dish.categoryId !== "indian").length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-6">
                      <div className="h-1 bg-green-500 flex-grow mr-4"></div>
                      <h2 className="text-2xl font-serif font-semibold text-green-700">Dinner</h2>
                      <div className="h-1 bg-green-500 flex-grow ml-4"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mealSections.dinner.filter(dish => dish.categoryId !== "indian").map((dish) => (
                        <DishCard
                          key={dish.id}
                          id={dish.id}
                          name={dish.name}
                          description={dish.description}
                          price={dish.price}
                          image={dish.image}
                          category={dish.mealType}
                          dietary={dish.dietary}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Show filtered results based on category */}
            {activeCategory !== "all" && activeCategory !== "indian" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDishes.map((dish) => (
                  <DishCard
                    key={dish.id}
                    id={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    image={dish.image}
                    category={dish.mealType}
                    dietary={dish.dietary}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No dishes found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
