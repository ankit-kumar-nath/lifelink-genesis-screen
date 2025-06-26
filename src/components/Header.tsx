
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-medical-red rounded-full p-2 medical-pulse">
              <Heart className="h-6 w-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">LifeLink</h1>
              <p className="text-xs text-gray-600">Blood Bank System</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-medical-red transition-colors">
              Home
            </a>
            <a href="#donate" className="text-gray-700 hover:text-medical-red transition-colors">
              Donate Blood
            </a>
            <a href="#request" className="text-gray-700 hover:text-medical-red transition-colors">
              Request Blood
            </a>
            <a href="#inventory" className="text-gray-700 hover:text-medical-red transition-colors">
              Inventory
            </a>
            <a href="#about" className="text-gray-700 hover:text-medical-red transition-colors">
              About
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white">
              Sign In
            </Button>
            <Button className="bg-medical-red hover:bg-medical-red-dark">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#home" className="text-gray-700 hover:text-medical-red transition-colors">
                Home
              </a>
              <a href="#donate" className="text-gray-700 hover:text-medical-red transition-colors">
                Donate Blood
              </a>
              <a href="#request" className="text-gray-700 hover:text-medical-red transition-colors">
                Request Blood
              </a>
              <a href="#inventory" className="text-gray-700 hover:text-medical-red transition-colors">
                Inventory
              </a>
              <a href="#about" className="text-gray-700 hover:text-medical-red transition-colors">
                About
              </a>
              <div className="flex flex-col space-y-2 mt-4">
                <Button variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white">
                  Sign In
                </Button>
                <Button className="bg-medical-red hover:bg-medical-red-dark">
                  Register
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
