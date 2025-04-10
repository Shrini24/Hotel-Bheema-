
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle2, ChefHat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Fix the type definition for order status to ensure compatibility
type OrderStatus = "pending" | "preparing" | "ready" | "delivered";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  notes: string;
}

interface Order {
  id: string;
  orderNumber: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: string;
  roomNumber: string;
}

const Kitchen = () => {
  // Using the fixed type definition
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "order1",
      orderNumber: "ORD-5674",
      time: "10:30 AM",
      status: "pending",
      items: [
        { id: "1", name: "Paneer Butter Masala", quantity: 1, notes: "Extra spicy" },
        { id: "2", name: "Garlic Naan", quantity: 2, notes: "" }
      ],
      customer: "John Doe",
      roomNumber: "204"
    },
    {
      id: "order2",
      orderNumber: "ORD-5675",
      time: "10:45 AM",
      status: "preparing",
      items: [
        { id: "3", name: "Chicken Biryani", quantity: 1, notes: "No cilantro" },
        { id: "4", name: "Raita", quantity: 1, notes: "" }
      ],
      customer: "Jane Smith",
      roomNumber: "315"
    },
    {
      id: "order3",
      orderNumber: "ORD-5676",
      time: "11:00 AM",
      status: "ready",
      items: [
        { id: "5", name: "Masala Dosa", quantity: 2, notes: "" },
        { id: "6", name: "Filter Coffee", quantity: 2, notes: "One with less sugar" }
      ],
      customer: "Michael Johnson",
      roomNumber: "427"
    }
  ]);

  const { toast } = useToast();
  
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    // Create a new array to avoid mutation issues with TypeScript
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    
    toast({
      title: "Order Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    });
  };

  const pendingOrders = orders.filter(order => order.status === "pending");
  const preparingOrders = orders.filter(order => order.status === "preparing");
  const readyOrders = orders.filter(order => order.status === "ready");
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-green-800">Kitchen Dashboard</h1>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex gap-2">
              <Clock size={18} />
              Pending ({pendingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="preparing" className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex gap-2">
              <ChefHat size={18} />
              Preparing ({preparingOrders.length})
            </TabsTrigger>
            <TabsTrigger value="ready" className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex gap-2">
              <CheckCircle2 size={18} />
              Ready ({readyOrders.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingOrders.length > 0 ? (
              <div className="grid gap-6">
                {pendingOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-medium text-lg">{order.orderNumber}</span>
                        <span className="text-gray-500 ml-3">{order.time}</span>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    
                    <ul className="mb-3">
                      {order.items.map(item => (
                        <li key={item.id} className="py-1 border-b border-gray-100 last:border-0">
                          <div className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                          </div>
                          {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm">
                        <p>Customer: <span className="font-medium">{order.customer}</span></p>
                        <p>Room: <span className="font-medium">{order.roomNumber}</span></p>
                      </div>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "preparing")} 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Start Preparing
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No pending orders at the moment</p>
            )}
          </TabsContent>
          
          <TabsContent value="preparing">
            {preparingOrders.length > 0 ? (
              <div className="grid gap-6">
                {preparingOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-medium text-lg">{order.orderNumber}</span>
                        <span className="text-gray-500 ml-3">{order.time}</span>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    
                    <ul className="mb-3">
                      {order.items.map(item => (
                        <li key={item.id} className="py-1 border-b border-gray-100 last:border-0">
                          <div className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                          </div>
                          {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm">
                        <p>Customer: <span className="font-medium">{order.customer}</span></p>
                        <p>Room: <span className="font-medium">{order.roomNumber}</span></p>
                      </div>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "ready")} 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark as Ready
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No orders being prepared at the moment</p>
            )}
          </TabsContent>
          
          <TabsContent value="ready">
            {readyOrders.length > 0 ? (
              <div className="grid gap-6">
                {readyOrders.map(order => (
                  <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-medium text-lg">{order.orderNumber}</span>
                        <span className="text-gray-500 ml-3">{order.time}</span>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    
                    <ul className="mb-3">
                      {order.items.map(item => (
                        <li key={item.id} className="py-1 border-b border-gray-100 last:border-0">
                          <div className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                          </div>
                          {item.notes && <p className="text-sm text-gray-500 mt-1">{item.notes}</p>}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="text-sm">
                        <p>Customer: <span className="font-medium">{order.customer}</span></p>
                        <p>Room: <span className="font-medium">{order.roomNumber}</span></p>
                      </div>
                      <Button 
                        onClick={() => updateOrderStatus(order.id, "delivered")} 
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Mark as Delivered
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-8 text-gray-500">No orders ready for delivery at the moment</p>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Kitchen;
