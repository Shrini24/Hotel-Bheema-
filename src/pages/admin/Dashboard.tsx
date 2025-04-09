
import React from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AreaChart, 
  Area,
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import { FileText, ShoppingBag, TrendingUp, Users } from "lucide-react";

const Dashboard: React.FC = () => {
  // Sample data for charts
  const salesData = [
    { name: "Mon", sales: 2400 },
    { name: "Tue", sales: 1398 },
    { name: "Wed", sales: 9800 },
    { name: "Thu", sales: 3908 },
    { name: "Fri", sales: 4800 },
    { name: "Sat", sales: 3800 },
    { name: "Sun", sales: 4300 },
  ];

  const categoryData = [
    { name: "Main Course", value: 45 },
    { name: "Appetizers", value: 25 },
    { name: "Desserts", value: 15 },
    { name: "Beverages", value: 15 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const orderTimeData = [
    { time: "6-9 AM", orders: 15 },
    { time: "9-12 PM", orders: 25 },
    { time: "12-3 PM", orders: 45 },
    { time: "3-6 PM", orders: 30 },
    { time: "6-9 PM", orders: 50 },
    { time: "9-12 AM", orders: 20 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title="Total Orders" 
            value="348" 
            change="+12% from last week" 
            icon={<FileText className="w-8 h-8 text-blue-500" />}
            color="blue"
          />
          <StatCard 
            title="Revenue" 
            value="$12,643" 
            change="+8% from last week" 
            icon={<TrendingUp className="w-8 h-8 text-green-500" />}
            color="green"
          />
          <StatCard 
            title="Menu Items" 
            value="124" 
            change="+3 new items" 
            icon={<ShoppingBag className="w-8 h-8 text-yellow-500" />}
            color="yellow"
          />
          <StatCard 
            title="Users" 
            value="42" 
            change="+5 new users" 
            icon={<Users className="w-8 h-8 text-purple-500" />}
            color="purple"
          />
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke="#f97316"
                      fill="#ffedd5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Order by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Times */}
          <Card>
            <CardHeader>
              <CardTitle>Order Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={orderTimeData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <ActivityItem 
                  message="New order #12345 received from Room 304"
                  time="10 minutes ago"
                  type="order"
                />
                <ActivityItem 
                  message="Order #12343 status changed to Ready for Delivery"
                  time="35 minutes ago"
                  type="status"
                />
                <ActivityItem 
                  message="Grilled Salmon stock is running low"
                  time="1 hour ago"
                  type="inventory"
                />
                <ActivityItem 
                  message="New user registered: John Smith"
                  time="2 hours ago"
                  type="user"
                />
                <ActivityItem 
                  message="Order #12341 has been delivered successfully"
                  time="3 hours ago"
                  type="delivery"
                />
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "purple";
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50";
      case "green":
        return "bg-green-50";
      case "yellow":
        return "bg-yellow-50";
      case "purple":
        return "bg-purple-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${getColorClasses()}`}>{icon}</div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-xl font-bold text-gray-900">{value}</h3>
            <p className="text-xs text-gray-600">{change}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityItemProps {
  message: string;
  time: string;
  type: "order" | "status" | "inventory" | "user" | "delivery";
}

const ActivityItem: React.FC<ActivityItemProps> = ({ message, time, type }) => {
  const getBadgeColor = () => {
    switch (type) {
      case "order":
        return "bg-blue-100 text-blue-800";
      case "status":
        return "bg-yellow-100 text-yellow-800";
      case "inventory":
        return "bg-red-100 text-red-800";
      case "user":
        return "bg-purple-100 text-purple-800";
      case "delivery":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <li className="flex items-start">
      <span className={`inline-block px-2 py-1 text-xs rounded-full ${getBadgeColor()}`}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
      <div className="ml-3">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </li>
  );
};

export default Dashboard;
