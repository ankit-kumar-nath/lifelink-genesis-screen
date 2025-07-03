
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DonateBlood from "./pages/DonateBlood";
import RequestBlood from "./pages/RequestBlood";
import Inventory from "./pages/Inventory";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DonorDashboard from "./pages/DonorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import HealthcareDashboard from "./pages/HealthcareDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/donate" element={<DonateBlood />} />
          <Route path="/request" element={<RequestBlood />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard/donor" element={<DonorDashboard />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/healthcare" element={<HealthcareDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
