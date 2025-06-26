
import { Heart, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CTASection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Join the LifeLink Community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you're a donor, patient, or healthcare provider, 
            LifeLink connects you to save lives together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* For Donors */}
          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-medical-red">
            <CardHeader className="pb-4">
              <div className="mx-auto w-20 h-20 bg-medical-red-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-10 w-10 text-medical-red" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                For Donors
              </CardTitle>
              <CardDescription className="text-gray-600">
                Make a difference with your donation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-red rounded-full mr-3"></div>
                  Quick and easy registration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-red rounded-full mr-3"></div>
                  Track your donation history
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-red rounded-full mr-3"></div>
                  Receive emergency alerts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-red rounded-full mr-3"></div>
                  Health checkup reminders
                </li>
              </ul>
              <Button className="w-full bg-medical-red hover:bg-medical-red-dark mt-6">
                Register as Donor
              </Button>
            </CardContent>
          </Card>

          {/* For Patients */}
          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-medical-blue">
            <CardHeader className="pb-4">
              <div className="mx-auto w-20 h-20 bg-medical-blue-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-medical-blue" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                For Patients
              </CardTitle>
              <CardDescription className="text-gray-600">
                Get the blood you need, when you need it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-blue rounded-full mr-3"></div>
                  Emergency blood requests
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-blue rounded-full mr-3"></div>
                  Real-time availability
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-blue rounded-full mr-3"></div>
                  Nearest blood bank locator
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-blue rounded-full mr-3"></div>
                  Priority matching system
                </li>
              </ul>
              <Button variant="outline" className="w-full border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white mt-6">
                Request Blood
              </Button>
            </CardContent>
          </Card>

          {/* For Healthcare */}
          <Card className="text-center group hover:shadow-xl transition-all duration-300 border-2 hover:border-medical-green">
            <CardHeader className="pb-4">
              <div className="mx-auto w-20 h-20 bg-medical-green-light rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-10 w-10 text-medical-green" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                For Healthcare
              </CardTitle>
              <CardDescription className="text-gray-600">
                Streamline your blood bank operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-green rounded-full mr-3"></div>
                  Inventory management system
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-green rounded-full mr-3"></div>
                  Donor database access
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-green rounded-full mr-3"></div>
                  Analytics and reporting
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-medical-green rounded-full mr-3"></div>
                  Compliance tools
                </li>
              </ul>
              <Button variant="outline" className="w-full border-medical-green text-medical-green hover:bg-medical-green hover:text-white mt-6">
                Healthcare Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-medical-red to-medical-red-dark rounded-2xl p-12 text-center text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Save Lives?</h3>
          <p className="text-red-100 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of donors, patients, and healthcare providers who trust LifeLink 
            for their blood bank management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-medical-red hover:bg-gray-100 px-8 py-4">
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-medical-red px-8 py-4"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
