
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  logout: async () => {},
  isLoading: true,
});

// Provide auth context to app
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Got existing session:", currentSession ? "Yes" : "No");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    }).catch(error => {
      console.error("Error getting session:", error);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      toast.success("You've been logged out successfully");
    } catch (error: any) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
