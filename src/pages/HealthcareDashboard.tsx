import { useEffect, useState } from "react";
import { Heart, Users, Activity, AlertTriangle, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const HealthcareDashboardContent = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const inventoryData = [
    { bloodType: "A+", available: 45, critical: 15, percentage: 75 },
    { bloodType: "A-", available: 12, critical: 10, percentage: 40 },
    { bloodType: "B+", available: 38, critical: 15, percentage: 70 },
    { bloodType: "B-", available: 8, critical: 10, percentage: 25 },
    { bloodType: "AB+", available: 25, critical: 10, percentage: 85 },
    { bloodType: "AB-", available: 6, critical: 8, percentage: 20 },
    { bloodType: "O+", available: 52, critical: 20, percentage: 80 },
    { bloodType: "O-", available: 15, critical: 12, percentage: 45 },
  ];

  const pendingRequests = [
    { id: 1, patient: "John Smith", bloodType: "A+", units: 2, urgency: "High", hospital: "Emergency Ward" },
    { id: 2, patient: "Sarah Johnson", bloodType: "O-", units: 1, urgency: "Critical", hospital: "ICU" },
    { id: 3, patient: "Mike Brown", bloodType: "B+", units: 3, urgency: "Medium", hospital: "Surgery Dept" },
  ];

  const recentDonations = [
    { donor: "Alice Wilson", bloodType: "O+", amount: "450ml", date: "2024-01-20", status: "Processed" },
    { donor: "Bob Davis", bloodType: "A-", amount: "450ml", date: "2024-01-20", status: "Testing" },
    { donor: "Carol Lee", bloodType: "B+", amount: "450ml", date: "2024-01-19", status: "Available" },
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthcare Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.email}! Manage blood inventory and patient requests.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
              <Heart className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">201</div>
              <p className="text-xs text-muted-foreground">Units available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">3</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">1,234</div>
              <p className="text-xs text-muted-foreground">Registered donors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Collections</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">12</div>
              <p className="text-xs text-muted-foreground">Donations collected</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Blood Types</CardTitle>
                  <CardDescription>Blood types running low on inventory</CardDescription>
                </CardHeader>
                <CardContent>
                  {inventoryData
                    .filter(item => item.percentage < 50)
                    .map((item) => (
                      <div key={item.bloodType} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          <div>
                            <p className="font-medium">{item.bloodType}</p>
                            <p className="text-sm text-gray-600">{item.available} units available</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Low Stock</Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Urgent Requests</CardTitle>
                  <CardDescription>High priority blood requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingRequests
                    .filter(request => request.urgency === "Critical" || request.urgency === "High")
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between py-3 border-b last:border-0">
                        <div className="flex items-center space-x-3">
                          <Heart className="h-4 w-4 text-medical-red" />
                          <div>
                            <p className="font-medium">{request.patient}</p>
                            <p className="text-sm text-gray-600">{request.bloodType} • {request.units} units • {request.hospital}</p>
                          </div>
                        </div>
                        <Badge variant={request.urgency === "Critical" ? "destructive" : "secondary"}>
                          {request.urgency}
                        </Badge>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Inventory Status</CardTitle>
                <CardDescription>Current stock levels by blood type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventoryData.map((item) => (
                    <div key={item.bloodType} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{item.bloodType}</h3>
                        <span className="text-sm text-gray-600">{item.available} units</span>
                      </div>
                      <Progress value={item.percentage} className="mb-2" />
                      <p className="text-xs text-gray-500">
                        Critical level: {item.critical} units
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Requests Management</CardTitle>
                <CardDescription>Process and fulfill blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-5 w-5 text-medical-red" />
                        <div>
                          <p className="font-medium">{request.patient}</p>
                          <p className="text-sm text-gray-600">
                            {request.bloodType} • {request.units} units • {request.hospital}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          request.urgency === "Critical" ? "destructive" : 
                          request.urgency === "High" ? "secondary" : "outline"
                        }>
                          {request.urgency}
                        </Badge>
                        <Button size="sm" className="bg-medical-red hover:bg-medical-red-dark">
                          Fulfill
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
                <CardDescription>Process and track blood donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-medical-red" />
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-gray-600">
                            {donation.bloodType} • {donation.amount} • {donation.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant={
                        donation.status === "Available" ? "default" : 
                        donation.status === "Testing" ? "secondary" : "outline"
                      }>
                        {donation.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const HealthcareDashboard = () => {
  return (
    <RoleProtectedRoute allowedRole="healthcare">
      <HealthcareDashboardContent />
    </RoleProtectedRoute>
  );
};

export default HealthcareDashboard;
