import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { NavbarProvider } from "@/context/NavbarContext";

import Layout from "@/components/Layout";
import HomePage from "@/pages/Index";
import CarsPage from "@/pages/Cars";
import CarDetailPage from "@/pages/CarDetail";
import BookingPage from "@/pages/Booking";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import DashboardPage from "@/pages/Dashboard";
import ProfilePage from "@/pages/Profile";
import BookingsPage from "@/pages/Bookings";
import AdminDashboardPage from "@/pages/admin/Dashboard";
import AdminCarsPage from "@/pages/admin/Cars";
import AdminBookingsPage from "@/pages/admin/Bookings";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NavbarProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="cars" element={<CarsPage />} />
                <Route path="cars/:id" element={<CarDetailPage />} />
                <Route path="booking/:id" element={<BookingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="dashboard" element={<DashboardPage />}>
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="bookings" element={<BookingsPage />} />
                </Route>
                <Route path="admin" element={<AdminDashboardPage />}>
                  <Route path="cars" element={<AdminCarsPage />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </NavbarProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
