
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
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="text-primary font-semibold text-sm">Advanced Features</span>
          </div>
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Comprehensive Blood Bank
            <span className="block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            LifeLink provides end-to-end blood bank management with cutting-edge technology 
            to ensure efficient operations and life-saving outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover-lift border-0 shadow-lg hover:shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4 relative">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-accent/70 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                  <feature.icon className={`h-10 w-10 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Banner */}
        <div className="mt-20 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-3xl p-12 text-center text-white shadow-2xl hover-lift glow-effect relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 mr-4 medical-pulse" />
              <Clock className="h-12 w-12" />
            </div>
            <h3 className="text-3xl font-bold mb-6">Emergency Blood Request System</h3>
            <p className="text-white/90 mb-8 max-w-3xl mx-auto text-lg leading-relaxed">
              When every second counts, our emergency alert system instantly notifies eligible donors 
              and nearby blood banks to respond to critical situations.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="glass-effect rounded-2xl px-8 py-6 hover-lift">
                <div className="text-3xl font-bold mb-2">&lt; 5 min</div>
                <div className="text-white/80 text-sm font-medium">Average Response Time</div>
              </div>
              <div className="glass-effect rounded-2xl px-8 py-6 hover-lift">
                <div className="text-3xl font-bold mb-2">95%</div>
                <div className="text-white/80 text-sm font-medium">Success Rate</div>
              </div>
              <div className="glass-effect rounded-2xl px-8 py-6 hover-lift">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80 text-sm font-medium">Service Availability</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
