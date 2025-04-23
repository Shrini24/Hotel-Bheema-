
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { session } = useAuth();

  React.useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Please enter email and password.");
      setLoading(false);
      return;
    }

    try {
      let res;
      if (isLogin) {
        res = await supabase.auth.signInWithPassword({ email, password });
      } else {
        res = await supabase.auth.signUp({ email, password });
      }
      
      if (res.error) {
        setError(res.error.message);
        toast.error(res.error.message);
      } else if (!isLogin && res.data?.user) {
        toast.success("Account created! Please check your email for verification.");
        setIsLogin(true); // Switch to login view after successful signup
      } else if (isLogin && res.data?.user) {
        toast.success("Successfully logged in!");
        navigate("/");
      }
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-xs space-y-6 bg-white border rounded-xl shadow px-6 py-8">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
        <form className="space-y-4" onSubmit={handleAuth}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Create account")}
          </Button>
        </form>
        <div className="text-sm text-center pt-2">
          {isLogin ? (
            <>
              Don't have an account?&nbsp;
              <button
                className="text-green-600 hover:underline"
                onClick={() => setIsLogin(false)}
                type="button"
                disabled={loading}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?&nbsp;
              <button
                className="text-green-600 hover:underline"
                onClick={() => setIsLogin(true)}
                type="button"
                disabled={loading}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
