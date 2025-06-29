
import { Heart, Users, Shield, Clock, Award, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4 medical-pulse">
                  <Heart className="h-12 w-12 text-white fill-current" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About LifeLink</h1>
              <p className="text-xl text-red-100 leading-relaxed">
                Connecting lives through advanced blood bank management, 
                ensuring every drop counts in saving lives across our community.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600">
                  To revolutionize blood bank management through technology, 
                  making blood donation and distribution more efficient, transparent, and accessible.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-medical-red rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    Building a strong network of donors, patients, and healthcare providers 
                    working together to save lives.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-medical-red rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Safety First</h3>
                  <p className="text-gray-600">
                    Maintaining the highest standards of safety and quality in blood 
                    collection, testing, and distribution.
                  </p>
                </div>

                <div className="text-center">
                  <div className="bg-medical-red rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Clock className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Availability</h3>
                  <p className="text-gray-600">
                    Round-the-clock emergency response system ensuring blood is available 
                    when and where it's needed most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
                <p className="text-lg text-gray-600">
                  Comprehensive blood bank solutions designed to meet the needs of our community.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Blood Donation Drives</h4>
                      <p className="text-gray-600">Regular community drives and mobile collection units</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Emergency Response</h4>
                      <p className="text-gray-600">24/7 emergency blood supply for critical situations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Blood Testing & Screening</h4>
                      <p className="text-gray-600">Comprehensive testing to ensure blood safety</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Inventory Management</h4>
                      <p className="text-gray-600">Real-time tracking of blood supplies and expiration dates</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Donor Management</h4>
                      <p className="text-gray-600">Complete donor registration and health tracking system</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-medical-red mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Hospital Coordination</h4>
                      <p className="text-gray-600">Seamless coordination with healthcare facilities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-medical">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Making a Difference</h2>
                <p className="text-lg text-gray-600">
                  Our impact in numbers - every donation counts, every life matters.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-medical-red mb-2">25,000+</div>
                  <div className="text-gray-600 font-medium">Lives Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-medical-red mb-2">15,000+</div>
                  <div className="text-gray-600 font-medium">Active Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-medical-red mb-2">100+</div>
                  <div className="text-gray-600 font-medium">Partner Hospitals</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-medical-red mb-2">24/7</div>
                  <div className="text-gray-600 font-medium">Emergency Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Leadership Team</h2>
                <p className="text-lg text-gray-600">
                  Dedicated professionals committed to advancing blood bank technology and saving lives.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">Dr. Sarah Johnson</h4>
                  <p className="text-medical-red mb-2">Chief Medical Officer</p>
                  <p className="text-gray-600 text-sm">
                    20+ years in hematology and blood bank management
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">Michael Chen</h4>
                  <p className="text-medical-red mb-2">Technology Director</p>
                  <p className="text-gray-600 text-sm">
                    Leading innovation in blood bank management systems
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-gray-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-1">Lisa Rodriguez</h4>
                  <p className="text-medical-red mb-2">Operations Manager</p>
                  <p className="text-gray-600 text-sm">
                    Ensuring efficient operations and donor relations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-medical-red">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-white/20 rounded-full p-4">
                  <Award className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
              <p className="text-xl text-red-100 mb-8">
                Every donation matters. Every volunteer counts. Every partnership saves lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-medical-red px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Become a Donor
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-medical-red transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
