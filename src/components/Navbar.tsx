import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Car, Calendar, Home, ChevronDown } from 'lucide-react';
import { useNavbar } from '@/context/NavbarContext';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const { isOpen, toggle, close } = useNavbar();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    close();
  };

  return (
    <nav className="bg-gray-200/95 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={close}>
            <img 
              src="/images/logo.png" 
              alt="Shubham Tour & Travels" 
              className="w-12 h-12 object-contain"
            />
            <span className="text-xl font-bold text-gray-800">
              Shubham Tour<span className="text-brand-orange"> & Travels</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">
              Home
            </Link>
            <Link to="/cars" className="text-gray-700 hover:text-gray-900 font-medium">
              Cars
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <span>{user?.name}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {isAdmin ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Admin Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/admin/cars')}>
                        Manage Cars
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/admin/bookings')}>
                        Manage Bookings
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/profile')}>
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/bookings')}>
                        My Bookings
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-orange hover:bg-brand-orange-600" size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700" onClick={toggle}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-300 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 py-2 px-1" onClick={close}>
                <div className="flex items-center space-x-2">
                  <Home size={18} />
                  <span>Home</span>
                </div>
              </Link>
              <Link to="/cars" className="text-gray-700 py-2 px-1" onClick={close}>
                <div className="flex items-center space-x-2">
                  <Car size={18} />
                  <span>Cars</span>
                </div>
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <>
                      <Link to="/admin" className="text-gray-700 py-2 px-1" onClick={close}>
                        Admin Dashboard
                      </Link>
                      <Link to="/admin/cars" className="text-gray-700 py-2 px-1" onClick={close}>
                        Manage Cars
                      </Link>
                      <Link to="/admin/bookings" className="text-gray-700 py-2 px-1" onClick={close}>
                        Manage Bookings
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard/profile" className="text-gray-700 py-2 px-1" onClick={close}>
                        <div className="flex items-center space-x-2">
                          <User size={18} />
                          <span>Profile</span>
                        </div>
                      </Link>
                      <Link to="/dashboard/bookings" className="text-gray-700 py-2 px-1" onClick={close}>
                        <div className="flex items-center space-x-2">
                          <Calendar size={18} />
                          <span>My Bookings</span>
                        </div>
                      </Link>
                    </>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="text-gray-700 py-2 px-1 text-left flex items-center space-x-2"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={close}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/register" onClick={close}>
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange-600">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
