
import { useState } from "react";
import { Heart, Calendar, MapPin, Phone, User, Mail, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DonateBlood = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const eligibilityRequirements = [
    "Age between 18-65 years",
    "Weight at least 50kg (110 lbs)",
    "Good general health",
    "No recent illness or infection",
    "No medication that affects blood clotting",
    "Not pregnant or breastfeeding"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-medical-red rounded-full p-4 medical-pulse">
                <Heart className="h-12 w-12 text-white fill-current" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Donate Blood, Save Lives
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your blood donation can save up to 3 lives. Join our community of heroes 
              and make a difference in someone's life today.
            </p>
          </div>

          <Tabs defaultValue="donate" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="donate" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Donate Now
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Eligibility
              </TabsTrigger>
              <TabsTrigger value="locations" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Locations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="donate">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-6 w-6 text-medical-red" />
                    Blood Donation Form
                  </CardTitle>
                  <CardDescription>
                    Fill out this form to schedule your blood donation appointment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-red focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-red focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-red focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Blood Type
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {bloodTypes.map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedBloodType(type)}
                              className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                                selectedBloodType === type
                                  ? "bg-medical-red text-white border-medical-red"
                                  : "bg-white text-gray-700 border-gray-300 hover:border-medical-red"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-red focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Location
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medical-red focus:border-transparent">
                          <option value="">Select a location</option>
                          <option value="central">Central Blood Bank</option>
                          <option value="north">North Branch</option>
                          <option value="south">South Branch</option>
                          <option value="mobile">Mobile Unit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full bg-medical-red hover:bg-medical-red-dark text-lg py-3">
                      Schedule Donation Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="eligibility">
              <Card>
                <CardHeader>
                  <CardTitle>Donation Eligibility Requirements</CardTitle>
                  <CardDescription>
                    Please review these requirements before scheduling your donation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Requirements</h3>
                      <ul className="space-y-3">
                        {eligibilityRequirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-medical-red rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Before You Donate</h3>
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">Day Before</h4>
                          <p className="text-blue-700 text-sm">Get a good night's sleep and eat iron-rich foods</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-medium text-green-800 mb-2">Day of Donation</h4>
                          <p className="text-green-700 text-sm">Eat a healthy meal and drink plenty of water</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-medium text-orange-800 mb-2">What to Bring</h4>
                          <p className="text-orange-700 text-sm">Valid ID and donation card (if you have one)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations">
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Central Blood Bank",
                    address: "123 Medical Center Dr, Downtown",
                    phone: "(555) 123-4567",
                    hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM"
                  },
                  {
                    name: "North Branch",
                    address: "456 Health Plaza, North District",
                    phone: "(555) 234-5678",
                    hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-3PM"
                  },
                  {
                    name: "South Branch",
                    address: "789 Care Avenue, South End",
                    phone: "(555) 345-6789",
                    hours: "Tue-Sat: 8AM-5PM"
                  },
                  {
                    name: "Mobile Unit",
                    address: "Various locations - Check schedule",
                    phone: "(555) 456-7890",
                    hours: "Schedule varies by location"
                  }
                ].map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-medical-red" />
                        {location.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-gray-600">{location.address}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{location.hours}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonateBlood;
