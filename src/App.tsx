
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import { AuthProvider } from "@/hooks/useAuth";
import { useAuth } from "@/hooks/useAuth";

// Import the admin pages
import Dashboard from "./pages/admin/Dashboard";
import OrdersAdmin from "./pages/admin/Orders";
import Kitchen from "./pages/admin/Kitchen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/location" element={<Location />} />

            {/* Auth Route */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/admin/orders" element={<RequireAuth><OrdersAdmin /></RequireAuth>} />
            <Route path="/admin/kitchen" element={<RequireAuth><Kitchen /></RequireAuth>} />
            
            {/* Catch all route for non-existing routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

// RequireAuth wrapper to protect admin routes
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

export default App;
