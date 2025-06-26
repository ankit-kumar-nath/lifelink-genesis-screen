
import { Heart, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 pb-16 gradient-hero min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Save Lives with
              <span className="block text-yellow-300">LifeLink</span>
            </h1>
            <p className="text-xl mb-8 text-red-100 leading-relaxed">
              Your trusted blood bank management system connecting donors, patients, 
              and healthcare facilities. Every donation counts, every life matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-white text-medical-red hover:bg-gray-100 text-lg px-8 py-4 shadow-lg"
              >
                <Heart className="mr-2 h-5 w-5" />
                Donate Blood Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-medical-red text-lg px-8 py-4"
              >
                Request Blood
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-red-200 text-sm">Lives Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-red-200 text-sm">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-red-200 text-sm">Emergency Service</div>
              </div>
            </div>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-2 gap-6 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Shield className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-white font-semibold mb-2">Safe & Secure</h3>
              <p className="text-red-100 text-sm">
                Advanced security protocols ensure donor and patient data protection
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Clock className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-white font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-red-100 text-sm">
                Live inventory updates and emergency blood request notifications
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Users className="h-12 w-12 text-yellow-300 mb-4" />
              <h3 className="text-white font-semibold mb-2">Community Network</h3>
              <p className="text-red-100 text-sm">
                Connect with donors and healthcare providers in your area
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <Heart className="h-12 w-12 text-yellow-300 mb-4 animate-pulse-slow" />
              <h3 className="text-white font-semibold mb-2">Life Saving Mission</h3>
              <p className="text-red-100 text-sm">
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
