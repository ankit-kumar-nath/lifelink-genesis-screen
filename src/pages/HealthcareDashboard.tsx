
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Calendar, BarChart3, User, Settings, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

const HealthcareDashboard = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/signin");
        return;
      }
      setUser(session.user);
    };
    checkAuth();
  }, [navigate]);

  const bloodInventory = [
    { type: "A+", available: 45, critical: 20, status: "Good" },
    { type: "A-", available: 12, critical: 15, status: "Critical" },
    { type: "B+", available: 38, critical: 20, status: "Good" },
    { type: "B-", available: 8, critical: 10, status: "Critical" },
    { type: "AB+", available: 15, critical: 8, status: "Good" },
    { type: "AB-", available: 3, critical: 5, status: "Critical" },
    { type: "O+", available: 67, critical: 25, status: "Good" },
    { type: "O-", available: 18, critical: 20, status: "Low" },
  ];

  const recentRequests = [
    { id: 1, patient: "John Doe", bloodType: "A+", units: 2, status: "Pending", priority: "High", hospital: "City General" },
    { id: 2, patient: "Jane Smith", bloodType: "O-", units: 1, status: "Fulfilled", priority: "Medium", hospital: "Memorial" },
    { id: 3, patient: "Bob Johnson", bloodType: "B+", units: 3, status: "Processing", priority: "High", hospital: "Regional" },
  ];

  const upcomingDonations = [
    { donor: "Alice Brown", bloodType: "O+", date: "2024-02-15", time: "10:00 AM", location: "Main Center" },
    { donor: "Charlie Davis", bloodType: "A-", date: "2024-02-15", time: "11:30 AM", location: "North Branch" },
    { donor: "Diana Wilson", bloodType: "B+", date: "2024-02-16", time: "9:00 AM", location: "Main Center" },
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
          <p className="text-gray-600">Welcome, {user.email}! Manage blood inventory and patient requests.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
              <Heart className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">206</div>
              <p className="text-xs text-muted-foreground">Units available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">12</div>
              <p className="text-xs text-muted-foreground">Awaiting fulfillment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Donations</CardTitle>
              <Calendar className="h-4 w-4 text-medical-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-red">8</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Types</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">3</div>
              <p className="text-xs text-muted-foreground">Below critical level</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Blood Types</CardTitle>
                  <CardDescription>Types below critical levels</CardDescription>
                </CardHeader>
                <CardContent>
                  {bloodInventory.filter(item => item.status === "Critical").map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        <div>
                          <p className="font-medium">{item.type}</p>
                          <p className="text-sm text-gray-600">{item.available} units available</p>
                        </div>
                      </div>
                      <Badge variant="destructive">{item.status}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>Latest patient blood requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex items-center space-x-3">
                        <Heart className="h-4 w-4 text-medical-red" />
                        <div>
                          <p className="font-medium">{request.patient}</p>
                          <p className="text-sm text-gray-600">{request.bloodType} - {request.units} units</p>
                        </div>
                      </div>
                      <Badge variant={request.status === "Fulfilled" ? "default" : "secondary"}>
                        {request.status}
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
                <CardTitle>Blood Inventory Management</CardTitle>
                <CardDescription>Monitor and manage blood type availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Available Units</TableHead>
                      <TableHead>Critical Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bloodInventory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell>{item.available}</TableCell>
                        <TableCell>{item.critical}</TableCell>
                        <TableCell>
                          <Badge variant={
                            item.status === "Critical" ? "destructive" : 
                            item.status === "Low" ? "secondary" : "default"
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Update</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Blood Requests Management</CardTitle>
                <CardDescription>Process and manage patient blood requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Units</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.patient}</TableCell>
                        <TableCell>{request.bloodType}</TableCell>
                        <TableCell>{request.units}</TableCell>
                        <TableCell>
                          <Badge variant={request.priority === "High" ? "destructive" : "secondary"}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.hospital}</TableCell>
                        <TableCell>
                          <Badge variant={request.status === "Fulfilled" ? "default" : "secondary"}>
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Process</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Schedule</CardTitle>
                <CardDescription>Manage upcoming donor appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-medical-red" />
                        <div>
                          <p className="font-medium">{donation.donor}</p>
                          <p className="text-sm text-gray-600">{donation.bloodType} • {donation.date} at {donation.time}</p>
                          <p className="text-xs text-gray-500">{donation.location}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Contact</Button>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Blood bank performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Monthly Statistics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Donations</span>
                        <span className="font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Fulfilled Requests</span>
                        <span className="font-medium">142</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Donors</span>
                        <span className="font-medium">89</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium">System Health</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Inventory Turnover</span>
                        <span className="font-medium text-green-600">Good</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-medium">2.3 hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Donor Retention</span>
                        <span className="font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthcareDashboard;
