
import { Heart, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 sm:pt-20 pb-12 sm:pb-16 gradient-hero min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white animate-fade-in text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Save Lives with
              <span className="block text-yellow-300">LifeLink</span>
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-red-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Your trusted blood bank management system connecting donors, patients, 
              and healthcare facilities. Every donation counts, every life matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-medical-red hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg w-full sm:w-auto"
              >
                <Heart className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Donate Blood Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-medical-red text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Request Blood
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">10K+</div>
                <div className="text-red-200 text-xs sm:text-sm">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">500+</div>
                <div className="text-red-200 text-xs sm:text-sm">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold mb-1">24/7</div>
                <div className="text-red-200 text-xs sm:text-sm">Emergency Service</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 animate-fade-in mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <Shield className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-300 mb-3 sm:mb-4 mx-auto sm:mx-0" />
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base text-center sm:text-left">Safe & Secure</h3>
              <p className="text-red-100 text-xs sm:text-sm text-center sm:text-left">
                Advanced security protocols ensure donor and patient data protection
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <Clock className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-300 mb-3 sm:mb-4 mx-auto sm:mx-0" />
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base text-center sm:text-left">Real-time Tracking</h3>
              <p className="text-red-100 text-xs sm:text-sm text-center sm:text-left">
                Live inventory updates and emergency blood request notifications
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <Users className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-300 mb-3 sm:mb-4 mx-auto sm:mx-0" />
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base text-center sm:text-left">Community Network</h3>
              <p className="text-red-100 text-xs sm:text-sm text-center sm:text-left">
                Connect with donors and healthcare providers in your area
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
              <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-yellow-300 mb-3 sm:mb-4 animate-pulse-slow mx-auto sm:mx-0" />
              <h3 className="text-white font-semibold mb-2 text-sm sm:text-base text-center sm:text-left">Life Saving Mission</h3>
              <p className="text-red-100 text-xs sm:text-sm text-center sm:text-left">
                Every donation can save up to 3 lives - be a hero today
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
