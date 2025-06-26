
import { useState } from "react";
import { Heart, Clock, MapPin, Phone, User, Mail, Droplets, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const RequestBlood = () => {
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "critical", label: "Critical (Within 2 hours)", color: "bg-red-500" },
    { value: "urgent", label: "Urgent (Within 24 hours)", color: "bg-orange-500" },
    { value: "routine", label: "Routine (Within 3 days)", color: "bg-yellow-500" }
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
              Request Blood
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Submit a blood request and we'll help connect you with compatible donors 
              and nearby blood banks as quickly as possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Emergency Alert */}
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">Emergency Protocol</h3>
                    <p className="text-red-700 text-sm">
                      For life-threatening emergencies, please call 911 immediately. 
                      This form is for blood requests that can wait for our response team.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-6 w-6 text-medical-red" />
                  Blood Request Form
                </CardTitle>
                <CardDescription>
                  Please provide detailed information about your blood request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientName">Patient Full Name</Label>
                      <Input
                        id="patientName"
                        type="text"
                        placeholder="Enter patient's full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientAge">Patient Age</Label>
                      <Input
                        id="patientAge"
                        type="number"
                        placeholder="Enter patient's age"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientGender">Gender</Label>
                      <select
                        id="patientGender"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-red focus:border-transparent"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="patientWeight">Weight (kg)</Label>
                      <Input
                        id="patientWeight"
                        type="number"
                        placeholder="Enter patient's weight"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Blood Request Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Request Details</h3>
                  <div className="space-y-4">
                    <div>
                      <Label>Required Blood Type</Label>
                      <div className="grid grid-cols-4 gap-2 mt-2">
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
                      <Label>Urgency Level</Label>
                      <div className="space-y-2 mt-2">
                        {urgencyLevels.map((level) => (
                          <button
                            key={level.value}
                            onClick={() => setUrgencyLevel(level.value)}
                            className={`w-full p-3 rounded-lg border text-left transition-colors ${
                              urgencyLevel === level.value
                                ? "border-medical-red bg-medical-red/5"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${level.color}`}></div>
                              <span className="font-medium">{level.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="unitsNeeded">Units Needed</Label>
                        <Input
                          id="unitsNeeded"
                          type="number"
                          placeholder="Number of units"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="neededBy">Needed By Date</Label>
                        <Input
                          id="neededBy"
                          type="datetime-local"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hospital/Medical Facility Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Hospital/Medical Facility</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hospitalName">Hospital/Clinic Name</Label>
                      <Input
                        id="hospitalName"
                        type="text"
                        placeholder="Enter hospital name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalAddress">Address</Label>
                      <Input
                        id="hospitalAddress"
                        type="text"
                        placeholder="Enter hospital address"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="doctorName">Attending Doctor</Label>
                      <Input
                        id="doctorName"
                        type="text"
                        placeholder="Doctor's name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hospitalPhone">Hospital Contact</Label>
                      <Input
                        id="hospitalPhone"
                        type="tel"
                        placeholder="Hospital phone number"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Person Name</Label>
                      <Input
                        id="contactName"
                        type="text"
                        placeholder="Your name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        placeholder="Your phone number"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Email Address</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        placeholder="Your email address"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship to Patient</Label>
                      <select
                        id="relationship"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-medical-red focus:border-transparent"
                      >
                        <option value="">Select relationship</option>
                        <option value="self">Self</option>
                        <option value="family">Family Member</option>
                        <option value="friend">Friend</option>
                        <option value="medical">Medical Professional</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any additional details about the medical condition, special requirements, or other relevant information..."
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-medical-red hover:bg-medical-red-dark text-lg py-3">
                    Submit Blood Request
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-medical-red" />
                  How Blood Requests Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-medical-red/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-medical-red font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">Submit Request</h4>
                    <p className="text-sm text-gray-600">Fill out the form with patient and medical details</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-medical-red/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-medical-red font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Match & Notify</h4>
                    <p className="text-sm text-gray-600">We match your request with available donors and blood banks</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-medical-red/10 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <span className="text-medical-red font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Coordinate</h4>
                    <p className="text-sm text-gray-600">We coordinate the blood transfer to your location</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestBlood;
