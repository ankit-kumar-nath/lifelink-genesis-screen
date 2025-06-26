
import { 
  UserPlus, 
  Search, 
  Bell, 
  BarChart3, 
  MapPin, 
  Shield,
  Clock,
  Heart
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: UserPlus,
      title: "Donor Registration",
      description: "Easy and secure donor registration with medical history tracking and eligibility verification.",
      color: "text-medical-red"
    },
    {
      icon: Search,
      title: "Blood Search",
      description: "Advanced search functionality to find compatible blood types and nearest available donors.",
      color: "text-medical-blue"
    },
    {
      icon: Bell,
      title: "Emergency Alerts",
      description: "Instant notifications for urgent blood requests and emergency situations in your area.",
      color: "text-orange-500"
    },
    {
      icon: BarChart3,
      title: "Inventory Management",
      description: "Real-time blood bank inventory tracking with expiration date monitoring and stock alerts.",
      color: "text-medical-green"
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Find nearby blood banks, donation centers, and hospitals with integrated mapping.",
      color: "text-purple-500"
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "HIPAA-compliant security measures protecting sensitive medical and personal information.",
      color: "text-gray-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Blood Bank Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            LifeLink provides end-to-end blood bank management with cutting-edge technology 
            to ensure efficient operations and life-saving outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-16 bg-medical-red rounded-2xl p-8 text-center text-white shadow-2xl">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 mr-3 animate-pulse-slow" />
            <Clock className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Emergency Blood Request System</h3>
          <p className="text-red-100 mb-6 max-w-2xl mx-auto">
            When every second counts, our emergency alert system instantly notifies eligible donors 
            and nearby blood banks to respond to critical situations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold">&lt; 5 min</div>
              <div className="text-sm text-red-100">Average Response Time</div>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-red-100">Success Rate</div>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3 backdrop-blur-sm">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-red-100">Service Availability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
