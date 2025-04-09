
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { Eye, Filter } from "lucide-react";

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
    customer: "John Smith",
    roomNumber: "304",
    specialInstructions: "Please include extra napkins and utensils."
  },
  {
    id: "order-456",
    orderNumber: "12346",
    date: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "pending" as const,
    items: [
      { id: "4", name: "Caprese Salad", quantity: 1, price: 14.50 },
      { id: "5", name: "Eggs Benedict", quantity: 2, price: 16.99 },
      { id: "6", name: "Red Wine", quantity: 1, price: 12.00 }
    ],
    total: 60.48,
    customer: "Emma Johnson",
    roomNumber: "215",
    specialInstructions: "No onions in the salad please."
  },
  {
    id: "order-789",
    orderNumber: "12347",
    date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: "ready" as const,
    items: [
      { id: "7", name: "Chocolate Lava Cake", quantity: 2, price: 10.99 },
      { id: "8", name: "Avocado Toast", quantity: 1, price: 14.50 }
    ],
    total: 36.48,
    customer: "Michael Brown",
    roomNumber: "412",
    specialInstructions: ""
  },
  {
    id: "order-101",
    orderNumber: "12348",
    date: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    status: "delivered" as const,
    items: [
      { id: "9", name: "Caesar Salad", quantity: 1, price: 12.99 },
      { id: "10", name: "Steak Frites", quantity: 1, price: 32.50 }
    ],
    total: 45.49,
    customer: "Sarah Davis",
    roomNumber: "506",
    specialInstructions: "Medium-rare steak please."
  },
  {
    id: "order-112",
    orderNumber: "12349",
    date: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    status: "cancelled" as const,
    items: [
      { id: "11", name: "Margherita Pizza", quantity: 1, price: 18.99 }
    ],
    total: 18.99,
    customer: "Robert Wilson",
    roomNumber: "128",
    specialInstructions: "Extra cheese."
  }
];

const OrdersAdmin: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const handleViewOrder = (order: typeof orders[0]) => {
    setSelectedOrder(order);
  };
  
  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    // In a real app, this would update the order status in the database
    toast({
      title: "Status updated",
      description: `Order #${selectedOrder?.orderNumber} status updated to ${newStatus}`,
    });
    setSelectedOrder(null);
  };
  
  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch = searchQuery === "" || 
                         order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });
  
  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Orders Management</h1>
        </div>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={18} />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative flex-grow">
            <Input
              type="search"
              placeholder="Search by order #, customer, or room"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.roomNumber}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleViewOrder(order)}>
                      <Eye size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredOrders.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500">No orders found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>Order #{selectedOrder.orderNumber}</span>
                <OrderStatusBadge status={selectedOrder.status} />
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <p className="font-medium">{selectedOrder.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Room Number</p>
                <p className="font-medium">{selectedOrder.roomNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(selectedOrder.date)}</p>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Order Items</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrder.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        ${(item.quantity * item.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${selectedOrder.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Special Instructions */}
            {selectedOrder.specialInstructions && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">Special Instructions</h3>
                <p className="bg-gray-50 p-3 rounded-md text-gray-700">
                  {selectedOrder.specialInstructions}
                </p>
              </div>
            )}
            
            {/* Status Update */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Update Status:</p>
                <Select onValueChange={(value) => handleUpdateStatus(selectedOrder.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Approve</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AdminLayout>
  );
};

export default OrdersAdmin;
