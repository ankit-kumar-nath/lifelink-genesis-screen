
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-medical-red rounded-full p-2">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">LifeLink</h3>
                <p className="text-sm text-gray-400">Blood Bank System</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Connecting donors, patients, and healthcare providers to save lives 
              through efficient blood bank management and emergency response systems.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-medical-red transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-medical-red transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-medical-red transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-medical-red transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/donate" className="text-gray-300 hover:text-white transition-colors">Donate Blood</a></li>
              <li><a href="/request" className="text-gray-300 hover:text-white transition-colors">Request Blood</a></li>
              <li><a href="/inventory" className="text-gray-300 hover:text-white transition-colors">Blood Inventory</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Emergency Alerts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Donor Registration</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blood Matching</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Inventory Management</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Health Screening</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Mobile Blood Drives</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-medical-red mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">123 Healthcare Street</p>
                  <p className="text-gray-300">Medical District</p>
                  <p className="text-gray-300">City, State 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-medical-red flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Emergency: (555) 911-BLOOD</p>
                  <p className="text-gray-300">General: (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-medical-red flex-shrink-0" />
                <div>
                  <p className="text-gray-300">info@lifelink.com</p>
                  <p className="text-gray-300">emergency@lifelink.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-12 p-6 bg-medical-red rounded-lg">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Heart className="h-6 w-6 text-white animate-pulse-slow" />
            <h4 className="text-xl font-bold text-white">Emergency Blood Need</h4>
          </div>
          <p className="text-center text-red-100">
            If you have an emergency blood requirement, call our 24/7 hotline: 
            <span className="font-bold text-white ml-2">(555) 911-BLOOD</span>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 LifeLink Blood Bank System. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
