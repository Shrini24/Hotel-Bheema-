
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Check, Clock, User } from "lucide-react";

// Sample data
const initialOrders = [
  {
    id: "order-123",
    orderNumber: "12345",
    time: "10:30 AM",
    status: "pending" as const,
    items: [
      { id: "item-1", name: "Grilled Salmon", quantity: 1, notes: "Medium well" },
      { id: "item-2", name: "Truffle Risotto", quantity: 1, notes: "" },
      { id: "item-3", name: "New York Cheesecake", quantity: 1, notes: "" }
    ],
    customer: "John Smith",
    roomNumber: "304"
  },
  {
    id: "order-456",
    orderNumber: "12346",
    time: "11:15 AM",
    status: "preparing" as const,
    items: [
      { id: "item-4", name: "Caprese Salad", quantity: 1, notes: "No onions" },
      { id: "item-5", name: "Eggs Benedict", quantity: 2, notes: "" },
      { id: "item-6", name: "Red Wine", quantity: 1, notes: "" }
    ],
    customer: "Emma Johnson",
    roomNumber: "215"
  },
  {
    id: "order-789",
    orderNumber: "12347",
    time: "11:45 AM",
    status: "preparing" as const,
    items: [
      { id: "item-7", name: "Chocolate Lava Cake", quantity: 2, notes: "" },
      { id: "item-8", name: "Avocado Toast", quantity: 1, notes: "Extra avocado" }
    ],
    customer: "Michael Brown",
    roomNumber: "412"
  },
  {
    id: "order-101",
    orderNumber: "12348",
    time: "12:00 PM",
    status: "ready" as const,
    items: [
      { id: "item-9", name: "Caesar Salad", quantity: 1, notes: "" },
      { id: "item-10", name: "Steak Frites", quantity: 1, notes: "Medium rare" }
    ],
    customer: "Sarah Davis",
    roomNumber: "506"
  },
  {
    id: "order-112",
    orderNumber: "12349",
    time: "12:15 PM",
    status: "ready" as const,
    items: [
      { id: "item-11", name: "Margherita Pizza", quantity: 1, notes: "Extra cheese" }
    ],
    customer: "Robert Wilson",
    roomNumber: "128"
  }
];

const Kitchen: React.FC = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const handleUpdateStatus = (orderId: string, newStatus: "preparing" | "ready" | "delivered") => {
    // In a real app, this would update the order status in the database
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    const orderNumber = orders.find(o => o.id === orderId)?.orderNumber;
    
    toast({
      title: "Status updated",
      description: `Order #${orderNumber} status updated to ${newStatus}`,
    });
  };
  
  const filterOrders = () => {
    if (activeTab === "all") return orders;
    return orders.filter(order => order.status === activeTab);
  };
  
  const filteredOrders = filterOrders();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Kitchen View</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Current Time:</span>
            <span className="font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="all">
              All Orders
              <Badge variant="secondary" className="ml-2">
                {orders.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <Badge variant="secondary" className="ml-2">
                {orders.filter(o => o.status === "pending").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="preparing">
              Preparing
              <Badge variant="secondary" className="ml-2">
                {orders.filter(o => o.status === "preparing").length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="ready">
              Ready
              <Badge variant="secondary" className="ml-2">
                {orders.filter(o => o.status === "ready").length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              onUpdateStatus={handleUpdateStatus} 
            />
          ))}
          
          {filteredOrders.length === 0 && (
            <div className="col-span-full bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-lg font-medium mb-2">No Orders</h3>
              <p className="text-gray-500">There are no orders with this status at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

interface OrderCardProps {
  order: (typeof initialOrders)[0];
  onUpdateStatus: (orderId: string, newStatus: "preparing" | "ready" | "delivered") => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const getStatusColor = () => {
    switch (order.status) {
      case "pending":
        return "bg-yellow-50";
      case "preparing":
        return "bg-blue-50";
      case "ready":
        return "bg-green-50";
      default:
        return "bg-white";
    }
  };
  
  const getStatusText = () => {
    switch (order.status) {
      case "pending":
        return "Pending";
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready for Delivery";
      default:
        return "Unknown Status";
    }
  };
  
  const getActionButton = () => {
    switch (order.status) {
      case "pending":
        return (
          <Button 
            onClick={() => onUpdateStatus(order.id, "preparing")} 
            className="w-full"
          >
            Start Preparing
          </Button>
        );
      case "preparing":
        return (
          <Button 
            onClick={() => onUpdateStatus(order.id, "ready")} 
            className="w-full"
          >
            Mark as Ready
          </Button>
        );
      case "ready":
        return (
          <Button 
            onClick={() => onUpdateStatus(order.id, "delivered")} 
            variant="outline" 
            className="w-full"
          >
            Mark as Delivered
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <Card className={`overflow-hidden ${getStatusColor()}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Order #{order.orderNumber}</CardTitle>
            <p className="text-sm text-gray-500">{order.time}</p>
          </div>
          <Badge variant={order.status === "pending" ? "outline" : "default"}>
            {getStatusText()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center text-gray-700 mb-2">
            <User size={16} className="mr-2" />
            <span className="text-sm">{order.customer} (Room {order.roomNumber})</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock size={16} className="mr-2" />
            <span className="text-sm">
              {order.status === "pending" 
                ? "Waiting for preparation" 
                : order.status === "preparing" 
                  ? "Currently preparing" 
                  : "Ready for pickup"}
            </span>
          </div>
        </div>
        
        <h3 className="font-medium mb-2">Items</h3>
        <ul className="space-y-2 mb-4">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <div>
                <span className="font-medium">{item.quantity}x</span> {item.name}
                {item.notes && (
                  <p className="text-xs text-gray-500">{item.notes}</p>
                )}
              </div>
              {order.status === "preparing" && (
                <Button variant="outline" size="icon" className="h-6 w-6">
                  <Check size={14} />
                </Button>
              )}
            </li>
          ))}
        </ul>
        
        {getActionButton()}
      </CardContent>
    </Card>
  );
};

export default Kitchen;
