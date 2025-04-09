
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import OrderCard from "@/components/orders/OrderCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OrderStatusTracker from "@/components/orders/OrderStatusTracker";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";

// Sample data
const orders = [
  {
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
    roomNumber: "304",
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    specialInstructions: "Please include extra napkins and utensils."
  },
  {
    id: "order-456",
    orderNumber: "12346",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "delivered" as const,
    items: [
      { id: "4", name: "Caprese Salad", quantity: 1, price: 14.50 },
      { id: "5", name: "Eggs Benedict", quantity: 2, price: 16.99 },
      { id: "6", name: "Red Wine", quantity: 1, price: 12.00 }
    ],
    total: 60.48,
    roomNumber: "304",
    estimatedDelivery: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000),
    specialInstructions: "No onions in the salad please."
  },
  {
    id: "order-789",
    orderNumber: "12347",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "cancelled" as const,
    items: [
      { id: "7", name: "Chocolate Lava Cake", quantity: 2, price: 10.99 },
      { id: "8", name: "Avocado Toast", quantity: 1, price: 14.50 }
    ],
    total: 36.48,
    roomNumber: "304",
    estimatedDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000),
    specialInstructions: ""
  }
];

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  
  const handleSearch = () => {
    // In a real app, this would search for the order
    if (orderNumber.trim()) {
      const foundOrder = orders.find(o => o.orderNumber === orderNumber.trim());
      if (foundOrder) {
        setSelectedOrder(foundOrder);
      } else {
        // Show a message that the order was not found
      }
    }
  };
  
  const handleViewOrderDetails = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setSelectedOrder(order);
    }
  };
  
  const filteredOrders = activeTab === "all" 
    ? orders 
    : orders.filter(order => {
        if (activeTab === "active") {
          return ["pending", "approved", "preparing", "ready"].includes(order.status);
        } else if (activeTab === "completed") {
          return order.status === "delivered";
        } else if (activeTab === "cancelled") {
          return order.status === "cancelled";
        }
        return false;
      });
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif font-bold mb-8">My Orders</h1>
        
        {/* Order Tracking Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Track Your Order</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input 
              type="text"
              placeholder="Enter your order number" 
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch} className="whitespace-nowrap">
              Track Order
            </Button>
          </div>
        </div>
        
        {/* Orders List */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredOrders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    id={order.id}
                    orderNumber={order.orderNumber}
                    date={order.date}
                    status={order.status}
                    items={order.items}
                    total={order.total}
                    roomNumber={order.roomNumber}
                    onViewDetails={handleViewOrderDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders in this category yet.</p>
                <Button asChild>
                  <a href="/menu">Browse Menu</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order #{selectedOrder.orderNumber}</span>
                <OrderStatusBadge status={selectedOrder.status} />
              </DialogTitle>
            </DialogHeader>
            
            {/* Order Status Tracker */}
            <div className="mb-4 pb-4 border-b">
              <OrderStatusTracker currentStatus={selectedOrder.status} />
            </div>
            
            {/* Order Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{formatDate(selectedOrder.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Estimated Delivery</p>
                  <p className="font-medium">{formatTime(selectedOrder.estimatedDelivery)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Location</p>
                  <p className="font-medium">Room {selectedOrder.roomNumber}</p>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Order Items</h3>
                <ul className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.quantity}x</span> {item.name}
                      </div>
                      <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between mt-4 pt-4 border-t font-bold">
                  <div>Total</div>
                  <div>${selectedOrder.total.toFixed(2)}</div>
                </div>
              </div>
              
              {/* Special Instructions */}
              {selectedOrder.specialInstructions && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Special Instructions</h3>
                  <p className="text-gray-700">{selectedOrder.specialInstructions}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Layout>
  );
};

export default Orders;
