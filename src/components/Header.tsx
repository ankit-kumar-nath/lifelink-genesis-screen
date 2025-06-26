
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 safe-area-top">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-medical-red rounded-full p-2 medical-pulse">
              <Heart className="h-5 w-5 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">LifeLink</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Blood Bank System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-medical-red transition-colors text-sm">
              Home
            </Link>
            <Link to="/donate" className="text-gray-700 hover:text-medical-red transition-colors text-sm">
              Donate Blood
            </Link>
            <Link to="/request" className="text-gray-700 hover:text-medical-red transition-colors text-sm">
              Request Blood
            </Link>
            <a href="#inventory" className="text-gray-700 hover:text-medical-red transition-colors text-sm">
              Inventory
            </a>
            <a href="#about" className="text-gray-700 hover:text-medical-red transition-colors text-sm">
              About
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" size="sm" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white">
              Sign In
            </Button>
            <Button size="sm" className="bg-medical-red hover:bg-medical-red-dark">
              Register
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
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
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4">
              <Link to="/" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Home
              </Link>
              <Link to="/donate" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Donate Blood
              </Link>
              <Link to="/request" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Request Blood
              </Link>
              <a href="#inventory" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                Inventory
              </a>
              <a href="#about" className="text-gray-700 hover:text-medical-red transition-colors py-2 px-1">
                About
              </a>
              <div className="flex flex-col space-y-2 mt-4 pt-3 border-t border-gray-100">
                <Button variant="outline" className="border-medical-red text-medical-red hover:bg-medical-red hover:text-white w-full">
                  Sign In
                </Button>
                <Button className="bg-medical-red hover:bg-medical-red-dark w-full">
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
