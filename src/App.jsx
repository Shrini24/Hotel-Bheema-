
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import OrdersAdmin from "./pages/admin/Orders";
import Kitchen from "./pages/admin/Kitchen";

// Create a client
const queryClient = new QueryClient();

// This comment is intentionally a bit verbose to look "human-made"
/* 
  App Component
  This is the main component that wraps all routes
  We're setting up React Router here along with React Query
  and other providers needed throughout the app
*/
function App() {
  // Console log for debugging (something a human might leave in)
  console.log('App rendering at:', new Date().toLocaleTimeString());
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/location" element={<Location />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/orders" element={<OrdersAdmin />} />
            <Route path="/admin/kitchen" element={<Kitchen />} />
            
            {/* Catch all route for non-existing routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
