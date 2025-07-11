import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar, MapPin, AlertCircle, User, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const PatientDashboardContent = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const bloodRequests = [
    { id: 1, date: "2024-01-20", bloodType: "A+", units: 2, status: "Fulfilled", hospital: "City General Hospital" },
    { id: 2, date: "2024-01-15", bloodType: "A+", units: 1, status: "Pending", hospital: "Memorial Hospital" },
    { id: 3, date: "2023-12-10", bloodType: "A+", units: 3, status: "Fulfilled", hospital: "Regional Medical Center" },
  ];

  const upcomingAppointments = [
    { date: "2024-02-10", time: "2:00 PM", location: "City General Hospital", type: "Blood Transfusion" },
    { date: "2024-02-20", time: "10:00 AM", location: "Specialist Clinic", type: "Follow-up" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Portal</h1>
          <p className="text-gray-600">Welcome, {user?.email}! Manage your blood requests and medical appointments.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">1</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">3</div>
              <p className="text-xs text-muted-foreground">Since registration</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Type</CardTitle>
              <Heart className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">A+</div>
              <p className="text-xs text-muted-foreground">Your blood type</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Blood Requests</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blood Requests</CardTitle>
                  <CardDescription>Your latest blood request status</CardDescription>
                </CardHeader>
                <CardContent>
                  {bloodRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-4 w-4 text-medical-red" />
                        <div>
                          <p className="font-medium">{request.bloodType} - {request.units} units</p>
                          <p className="text-sm text-gray-600">{request.date} • {request.hospital}</p>
                        </div>
                      </div>
                      <Badge variant={request.status === "Fulfilled" ? "default" : "secondary"}>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-medical-red hover:bg-medical-red-dark">
                    New Blood Request
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-medical-red" />
                        <div>
                          <p className="font-medium">{appointment.date}</p>
                          <p className="text-sm text-gray-600">{appointment.time} • {appointment.location}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{appointment.type}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Requests</CardTitle>
                <CardDescription>Manage your blood requests and track their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-medical-red hover:bg-medical-red-dark">
                    Submit New Blood Request
                  </Button>
                  <div className="space-y-3">
                    {bloodRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Heart className="h-5 w-5 text-medical-red" />
                          <div>
                            <p className="font-medium">{request.bloodType} - {request.units} units</p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {request.hospital}
                            </p>
                            <p className="text-xs text-gray-500">Requested on {request.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={request.status === "Fulfilled" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                          {request.status === "Pending" && (
                            <Button variant="outline" size="sm">Track</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Appointments</CardTitle>
                <CardDescription>Schedule and manage your medical appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full bg-medical-red hover:bg-medical-red-dark">
                    Schedule New Appointment
                  </Button>
                  <div className="space-y-3">
                    {upcomingAppointments.map((appointment, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-5 w-5 text-medical-red" />
                          <div>
                            <p className="font-medium">{appointment.date} at {appointment.time}</p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {appointment.location}
                            </p>
                            <p className="text-xs text-gray-500">{appointment.type}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="destructive" size="sm">Cancel</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Profile</CardTitle>
                <CardDescription>Manage your medical information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-medical-red" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-medical-red" />
                    <div>
                      <p className="font-medium">Blood Type</p>
                      <p className="text-sm text-gray-600">A+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-5 w-5 text-medical-red" />
                    <div>
                      <p className="font-medium">Medical Conditions</p>
                      <p className="text-sm text-gray-600">Click to add medical conditions</p>
                    </div>
                  </div>
                  <Button className="w-full bg-medical-red hover:bg-medical-red-dark">
                    Update Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const PatientDashboard = () => {
  return (
    <RoleProtectedRoute allowedRole="patient">
      <PatientDashboardContent />
    </RoleProtectedRoute>
  );
};

export default PatientDashboard;
