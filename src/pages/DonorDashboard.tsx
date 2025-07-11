import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Calendar, MapPin, Droplets, User, Award } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const DonorDashboardContent = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const donationHistory = [
    { id: 1, date: "2024-01-15", location: "City Hospital", amount: "450ml", status: "Completed" },
    { id: 2, date: "2023-11-20", location: "Blood Drive Center", amount: "450ml", status: "Completed" },
    { id: 3, date: "2023-09-10", location: "Community Center", amount: "450ml", status: "Completed" },
  ];

  const upcomingAppointments = [
    { date: "2024-02-15", time: "10:00 AM", location: "City Hospital" },
    { date: "2024-03-20", time: "2:00 PM", location: "Blood Drive Center" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Donor Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.email}! Thank you for being a life-saving blood donor.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Heart className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">12</div>
              <p className="text-xs text-muted-foreground">Lifetime donations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blood Donated</CardTitle>
              <Droplets className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">5,400ml</div>
              <p className="text-xs text-muted-foreground">Total volume</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lives Saved</CardTitle>
              <Award className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">36</div>
              <p className="text-xs text-muted-foreground">Estimated impact</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Eligible</CardTitle>
              <Calendar className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Ready</div>
              <p className="text-xs text-muted-foreground">Available to donate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">Donation History</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Donations</CardTitle>
                  <CardDescription>Your latest blood donation activities</CardDescription>
                </CardHeader>
                <CardContent>
                  {donationHistory.slice(0, 3).map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-4 w-4 text-medical-red" />
                        <div>
                          <p className="font-medium">{donation.date}</p>
                          <p className="text-sm text-gray-600">{donation.location} • {donation.amount}</p>
                        </div>
                      </div>
                      <Badge variant="default">{donation.status}</Badge>
                    </div>
                  ))}
                  <Button className="w-full mt-4 bg-medical-red hover:bg-medical-red-dark">
                    Schedule Donation
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled donation appointments</CardDescription>
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
                      <Badge variant="outline">Confirmed</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Complete record of your blood donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {donationHistory.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-5 w-5 text-medical-red" />
                        <div>
                          <p className="font-medium">{donation.date}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {donation.location}
                          </p>
                          <p className="text-xs text-gray-500">Amount: {donation.amount}</p>
                        </div>
                      </div>
                      <Badge variant="default">{donation.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Appointments</CardTitle>
                <CardDescription>Schedule and manage your donation appointments</CardDescription>
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
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Reschedule</Button>
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
                <CardTitle>Donor Profile</CardTitle>
                <CardDescription>Manage your donor information</CardDescription>
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
                      <p className="text-sm text-gray-600">O+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-medical-red" />
                    <div>
                      <p className="font-medium">Donor Level</p>
                      <p className="text-sm text-gray-600">Gold Donor (12+ donations)</p>
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

const DonorDashboard = () => {
  return (
    <RoleProtectedRoute allowedRole="donor">
      <DonorDashboardContent />
    </RoleProtectedRoute>
  );
};

export default DonorDashboard;
