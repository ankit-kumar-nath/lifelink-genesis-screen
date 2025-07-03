
import { Heart, Shield, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-16 sm:pt-20 pb-12 sm:pb-16 gradient-hero min-h-screen flex items-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-white fade-in-up text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30 mb-4">
                🩸 Trusted by 10,000+ Lives Saved
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Save Lives with
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                LifeLink
              </span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Your trusted blood bank management system connecting donors, patients, 
              and healthcare facilities. Every donation counts, every life matters.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button 
                variant="glass"
                size="lg" 
                className="text-base sm:text-lg px-8 py-4 group"
              >
                <Heart className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Donate Blood Now
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-2 border-white/50 text-white hover:bg-white hover:text-primary text-base sm:text-lg px-8 py-4"
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
          <div className="grid grid-cols-2 gap-6 fade-in-up mt-8 lg:mt-0">
            <div className="glass-effect rounded-2xl p-6 hover-lift group">
              <Shield className="h-12 w-12 text-yellow-300 mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-3 text-base text-center sm:text-left">Safe & Secure</h3>
              <p className="text-white/80 text-sm text-center sm:text-left leading-relaxed">
                Advanced security protocols ensure donor and patient data protection
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover-lift group">
              <Clock className="h-12 w-12 text-yellow-300 mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-3 text-base text-center sm:text-left">Real-time Tracking</h3>
              <p className="text-white/80 text-sm text-center sm:text-left leading-relaxed">
                Live inventory updates and emergency blood request notifications
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover-lift group">
              <Users className="h-12 w-12 text-yellow-300 mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-white font-bold mb-3 text-base text-center sm:text-left">Community Network</h3>
              <p className="text-white/80 text-sm text-center sm:text-left leading-relaxed">
                Connect with donors and healthcare providers in your area
              </p>
            </div>
            
            <div className="glass-effect rounded-2xl p-6 hover-lift group glow-effect">
              <Heart className="h-12 w-12 text-yellow-300 mb-4 medical-pulse mx-auto sm:mx-0" />
              <h3 className="text-white font-bold mb-3 text-base text-center sm:text-left">Life Saving Mission</h3>
              <p className="text-white/80 text-sm text-center sm:text-left leading-relaxed">
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
