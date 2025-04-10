
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import DishCard from "@/components/dishes/DishCard";
import CategoryTabs from "@/components/dishes/CategoryTabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

// Sample data
const categories = [
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "desserts", name: "Desserts" },
  { id: "beverages", name: "Beverages" },
];

const dishes = [
  {
    id: "1",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon butter sauce. Served with seasonal vegetables.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
    categoryId: "dinner",
    dietary: ["Gluten Free", "Protein Rich"]
  },
  {
    id: "2",
    name: "Truffle Risotto",
    description: "Creamy Arborio rice slowly cooked with white wine, finished with black truffle and parmesan cheese.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1633478862406-b5b653860cd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmlzb3R0b3xlbnwwfHwwfHx8MA%3D%3D",
    categoryId: "lunch",
    dietary: ["Vegetarian"]
  },
  {
    id: "3",
    name: "New York Cheesecake",
    description: "Classic New York style cheesecake with graham cracker crust, topped with seasonal berries.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D",
    categoryId: "desserts",
    dietary: ["Vegetarian"]
  },
  {
    id: "4",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze and extra virgin olive oil.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1500217052183-bc01eee1a74e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FwcmVzZXxlbnwwfHwwfHx8MA%3D%3D",
    categoryId: "lunch",
    dietary: ["Vegetarian", "Gluten Free"]
  },
  {
    id: "5",
    name: "Eggs Benedict",
    description: "Poached eggs and Canadian bacon on English muffins, topped with hollandaise sauce.",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdncyUyMGJlbmVkaWN0fGVufDB8fDB8fHww",
    categoryId: "breakfast",
    dietary: []
  },
  {
    id: "6",
    name: "Red Wine",
    description: "Glass of premium Cabernet Sauvignon from Napa Valley.",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVkJTIwd2luZXxlbnwwfHwwfHx8MA%3D%3D",
    categoryId: "beverages",
    dietary: ["Vegan"]
  },
  {
    id: "7",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream.",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1617305855058-336d24456869?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    categoryId: "desserts",
    dietary: ["Vegetarian"]
  },
  {
    id: "8",
    name: "Avocado Toast",
    description: "Multigrain toast topped with smashed avocado, poached eggs, and microgreens.",
    price: 14.50,
    image: "https://images.unsplash.com/photo-1603046891744-1f76ace3f196?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww",
    categoryId: "breakfast",
    dietary: ["Vegetarian"]
  }
];

const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleAddToCart = (id: string) => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = activeCategory === "all" || dish.categoryId === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-serif font-bold mb-3 text-green-800">Our Menu</h1>
          <p className="text-green-700 max-w-3xl">
            Discover our exquisite selection of dishes crafted by our award-winning chefs. 
            All meals are prepared with the freshest ingredients and can be delivered 
            directly to your room.
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400" size={18} />
            <Input 
              type="search"
              placeholder="Search dishes..."
              className="pl-10 border-green-200 focus:border-green-300"
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

        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                id={dish.id}
                name={dish.name}
                description={dish.description}
                price={dish.price}
                image={dish.image}
                category={getCategoryName(dish.categoryId)}
                dietary={dish.dietary}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-green-800">No dishes found</h3>
            <p className="mt-2 text-green-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Menu;
