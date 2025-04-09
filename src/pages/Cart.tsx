
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2 } from "lucide-react";

// Sample data
const cartItems = [
  {
    id: "1",
    name: "Grilled Salmon",
    price: 28.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fHww"
  },
  {
    id: "2",
    name: "Truffle Risotto",
    price: 22.50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1633478862406-b5b653860cd9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cmlzb3R0b3xlbnwwfHwwfHx8MA%3D%3D"
  }
];

const Cart: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleQuantityChange = (id: string, change: number) => {
    // In a real app, this would update the quantity of the item
    toast({
      title: "Quantity updated",
      description: "Your cart has been updated",
    });
  };
  
  const handleRemoveItem = (id: string) => {
    // In a real app, this would remove the item from the cart
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };
  
  const handleCheckout = () => {
    // In a real app, this would proceed to checkout
    toast({
      title: "Order placed",
      description: "Your order has been placed successfully",
    });
    navigate("/orders");
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const subtotal = calculateSubtotal();
  const serviceCharge = subtotal * 0.15; // 15% service charge
  const total = subtotal + serviceCharge;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-lg font-medium mb-4">Cart Items</h2>
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6 flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-gray-900 font-medium">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between">
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              type="button"
                              className="p-1 text-gray-600 hover:text-gray-900"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 py-1 text-gray-900 min-w-[30px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="p-1 text-gray-600 hover:text-gray-900"
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Special Instructions</h2>
                <Textarea 
                  placeholder="Add any special instructions or dietary requirements here..."
                  className="mb-4"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Service Charge (15%)</p>
                    <p className="font-medium">${serviceCharge.toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <p className="font-semibold">Total</p>
                    <p className="font-bold">${total.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="mb-4">
                    <label htmlFor="room-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Room Number
                    </label>
                    <Input
                      id="room-number"
                      type="text"
                      placeholder="Enter your room number"
                      defaultValue="304"
                    />
                  </div>
                  
                  <Button onClick={handleCheckout} className="w-full mb-3">
                    Place Order
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/menu">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild>
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
