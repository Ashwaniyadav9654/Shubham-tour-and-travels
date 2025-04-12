import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state or default to homepage
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back! You've successfully logged in.",
      });
      
      // Redirect to the original intended page or home
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to login. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // For demo users information
  const demoCredentials = [
    { role: 'Regular User', email: 'shubhamtourandtravels9@gmail.com', password: 'user123' },
    { role: 'Admin', email: 'yadavshubham6695@gmail.com', password: 'admin123' }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Login to access your account and manage your bookings
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2">
              <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-brand-blue-600 hover:text-brand-blue-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-blue-600 hover:bg-brand-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-brand-blue-600 hover:text-brand-blue-500 font-semibold">
                Register Now
              </Link>
            </p>
          </div>
        </div>
        
        {/* Demo accounts section */}
        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Demo Accounts</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="p-2 bg-white rounded border border-gray-200">
                <div><span className="font-medium">Role:</span> {cred.role}</div>
                <div><span className="font-medium">Email:</span> {cred.email}</div>
                <div><span className="font-medium">Password:</span> {cred.password}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
