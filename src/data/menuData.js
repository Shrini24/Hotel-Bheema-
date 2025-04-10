
// Sample data with meal types
export const categories = [
  { id: "all", name: "All" },
  { id: "breakfast", name: "Breakfast" },
  { id: "lunch", name: "Lunch" },
  { id: "dinner", name: "Dinner" },
  { id: "indian", name: "Indian Specialties" },
];

export const dishes = [
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
