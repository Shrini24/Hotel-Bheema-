
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import DishCard from "@/components/dishes/DishCard";
import { useToast } from "@/hooks/use-toast";
import OrderStatusTracker from "@/components/orders/OrderStatusTracker";
import OrderCard from "@/components/orders/OrderCard";
import { MapPin } from "lucide-react";

// Sample data
const featuredDishes = [
  {
    id: "1",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon grilled to perfection with herbs and lemon butter sauce. Served with seasonal vegetables.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww",
    category: "Main Course",
    dietary: ["Gluten Free", "Protein Rich"]
  },
  {
    id: "2",
    name: "Truffle Risotto",
    description: "Creamy Arborio rice slowly cooked with white wine, finished with black truffle and parmesan cheese.",
    price: 22.50,
    image: "https://images.unsplash.com/photo-1633478862406-b5b653860cd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmlzb3R0b3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Main Course",
    dietary: ["Vegetarian"]
  },
  {
    id: "3",
    name: "New York Cheesecake",
    description: "Classic New York style cheesecake with graham cracker crust, topped with seasonal berries.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D",
    category: "Dessert",
    dietary: ["Vegetarian"]
  }
];

const recentOrder = {
  id: "order-123",
  orderNumber: "12345",
  date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  status: "preparing" as const,
  items: [
    { id: "1", name: "Grilled Salmon", quantity: 1, price: 28.99 },
    { id: "2", name: "Truffle Risotto", quantity: 1, price: 22.50 },
    { id: "3", name: "New York Cheesecake", quantity: 1, price: 12.99 }
  ],
  total: 64.48,
  roomNumber: "304"
};

const Index: React.FC = () => {
  const { toast } = useToast();
  
  const handleAddToCart = (id: string) => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };
  
  const handleViewOrderDetails = (id: string) => {
    // In a real app, this would navigate to the order details page
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574936145840-28808d77a0b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-lg">
            <h1 className="text-4xl font-serif font-bold mb-4">
              Hotel Bheema Luxury Dining
            </h1>
            <p className="text-lg mb-6">
              Order from our award-winning menu and enjoy delicious meals delivered straight to your room.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/menu">Browse Menu</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
                <Link to="/orders">Track Order</Link>
              </Button>
              <Button size="lg" variant="secondary" className="flex items-center" asChild>
                <Link to="/location">
                  <MapPin className="mr-1 h-4 w-4" />
                  Our Location
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-serif font-semibold text-gray-900">
            Featured Dishes
          </h2>
          <Link to="/menu" className="text-hotel-600 hover:text-hotel-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              id={dish.id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
              category={dish.category}
              dietary={dish.dietary}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </section>

      {/* Location Preview */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-4 md:mb-0">
              Find Us in Ramanathapuram
            </h2>
            <Button variant="outline" asChild>
              <Link to="/location" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                View on Map
              </Link>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <MapPin className="h-6 w-6 text-hotel-600" />
              <p className="text-gray-700">Aranmani street, Laxmi Puram, Ramanathapuram, Tamil Nadu 623501</p>
              <Button variant="link" onClick={() => window.open("https://www.google.com/maps/dir//Aranmani+street,+Laxmi+Puram,+Ramanathapuram,+Tamil+Nadu+623501/@9.3707008,78.7453869,12z/", "_blank")} className="text-hotel-600 p-0">
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Order Tracking Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-6">
            Track Your Order
          </h2>
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <OrderStatusTracker currentStatus={recentOrder.status} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderCard
              id={recentOrder.id}
              orderNumber={recentOrder.orderNumber}
              date={recentOrder.date}
              status={recentOrder.status}
              items={recentOrder.items}
              total={recentOrder.total}
              roomNumber={recentOrder.roomNumber}
              onViewDetails={handleViewOrderDetails}
            />
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center items-center">
              <h3 className="text-xl font-medium mb-4 text-center">Need Help with Your Order?</h3>
              <p className="text-gray-600 text-center mb-6">
                Our staff is available 24/7 to assist you with your dining needs.
              </p>
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Room Service
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-semibold text-gray-900 mb-12 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-hotel-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-hotel-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Browse Our Menu</h3>
            <p className="text-gray-600">
              Explore our extensive menu of delicious dishes prepared by our world-class chefs.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-hotel-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-hotel-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Place Your Order</h3>
            <p className="text-gray-600">
              Select your desired dishes, customize them to your preference, and place your order.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-hotel-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-hotel-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Delivery to Your Room</h3>
            <p className="text-gray-600">
              Track your order in real-time and enjoy delivery straight to your room.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
