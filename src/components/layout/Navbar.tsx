
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, MapPin, LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  const { toast: uiToast } = useToast();
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      toast("Logged out", {
        description: "You have been logged out successfully.",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-green-600 font-serif text-2xl font-bold">
                Hotel Bheema
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-green-300 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="border-transparent text-gray-500 hover:border-green-300 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Menu
              </Link>
              <Link
                to="/orders"
                className="border-transparent text-gray-500 hover:border-green-300 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                My Orders
              </Link>
              <Link
                to="/location"
                className="border-transparent text-gray-500 hover:border-green-300 hover:text-green-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Location
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/cart" className="relative p-1 rounded-full text-gray-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <ShoppingCart className="h-6 w-6" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 flex items-center justify-center bg-green-600">
                2
              </Badge>
            </Link>
            <div className="ml-3">
              {isLoading ? (
                <Button variant="ghost" disabled className="flex items-center space-x-1">
                  <span>Loading...</span>
                </Button>
              ) : !user ? (
                <Button variant="ghost" onClick={handleLoginClick} className="flex items-center space-x-1 text-green-700 hover:bg-green-50">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Button>
              ) : (
                <Button variant="ghost" onClick={handleLogoutClick} className="flex items-center space-x-1 text-green-700 hover:bg-green-50">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              )}
            </div>
            {user && (
              <div className="ml-3">
                <Button variant="outline" asChild className="border-green-300 text-green-700 hover:bg-green-50">
                  <Link to="/admin">Admin</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
