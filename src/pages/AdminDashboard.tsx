import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Users, 
  MapPin, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Filter,
  Download,
  UserPlus,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import RoleProtectedRoute from "@/components/RoleProtectedRoute";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  capacity: number;
  created_at: string;
}

type Role = "admin" | "donor" | "patient" | "healthcare";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  blood_type: string;
  phone: string;
  created_at: string;
}

interface BloodInventory {
  id: string;
  location_id: string;
  blood_type: string;
  units_available: number;
  expiry_date: string;
  locations?: Partial<Location>;
}

interface BloodRequest {
  id: string;
  patient_id: string;
  blood_type: string;
  units_needed: number;
  urgency: string;
  status: string;
  hospital_name: string;
  doctor_name: string;
  reason: string;
  created_at: string;
  users?: Partial<User>;
}

const AdminDashboard = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inventory, setInventory] = useState<BloodInventory[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLocations: 0,
    totalBloodUnits: 0,
    pendingRequests: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Form states for new location
  const [newLocation, setNewLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    capacity: ""
  });

  // Form states for new user
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "donor",
    blood_type: "",
    phone: ""
  });

  // Form states for inventory
  const [newInventory, setNewInventory] = useState({
    location_id: "",
    blood_type: "",
    units_available: "",
    expiry_date: ""
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchLocations(),
        fetchUsers(),
        fetchInventory(),
        fetchRequests(),
        fetchStats()
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching locations:", error);
      return;
    }
    setLocations(data || []);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching users:", error);
      return;
    }
    setUsers(data || []);
  };

  const fetchInventory = async () => {
    const { data, error } = await supabase
      .from('blood_inventory')
      .select(`
        *,
        locations (
          id,
          name,
          city,
          state
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching inventory:", error);
      return;
    }
    setInventory(data || []);
  };

  const fetchRequests = async () => {
    const { data, error } = await supabase
      .from('blood_requests')
      .select(`
        *,
        users (
          id,
          email,
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Error fetching requests:", error);
      return;
    }
    setRequests(data || []);
  };

  const fetchStats = async () => {
    try {
      const [usersCount, locationsCount, inventorySum, pendingRequestsCount] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase.from('locations').select('id', { count: 'exact', head: true }),
        supabase.from('blood_inventory').select('units_available'),
        supabase.from('blood_requests').select('id', { count: 'exact', head: true }).eq('status', 'pending')
      ]);

      const totalBloodUnits = inventorySum.data?.reduce((sum, item) => sum + (item.units_available || 0), 0) || 0;

      setStats({
        totalUsers: usersCount.count || 0,
        totalLocations: locationsCount.count || 0,
        totalBloodUnits,
        pendingRequests: pendingRequestsCount.count || 0
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleAddLocation = async () => {
    try {
      const { error } = await supabase
        .from('locations')
        .insert([{
          ...newLocation,
          capacity: parseInt(newLocation.capacity) || 0
        }]);

      if (error) throw error;

      toast.success("Location added successfully");
      setNewLocation({
        name: "",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: "",
        capacity: ""
      });
      fetchLocations();
      fetchStats();
    } catch (error: any) {
      console.error("Error adding location:", error);
      toast.error(error.message || "Failed to add location");
    }
  };

  const handleAddUser = async () => {
    try {
      // First create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Then add the user to our users table
        const { error: userError } = await supabase
          .from('users')
          .insert([{
            id: authData.user.id,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            role: newUser.role,
            blood_type: newUser.blood_type || null,
            phone: newUser.phone || null
          }]);

        if (userError) throw userError;

        toast.success("User created successfully");
        setNewUser({
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          role: "donor",
          blood_type: "",
          phone: ""
        });
        fetchUsers();
        fetchStats();
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Failed to create user");
    }
  };

  const handleAddInventory = async () => {
    try {
      const { error } = await supabase
        .from('blood_inventory')
        .insert([{
          location_id: newInventory.location_id,
          blood_type: newInventory.blood_type,
          units_available: parseInt(newInventory.units_available) || 0,
          expiry_date: newInventory.expiry_date
        }]);

      if (error) throw error;

      toast.success("Blood inventory added successfully");
      setNewInventory({
        location_id: "",
        blood_type: "",
        units_available: "",
        expiry_date: ""
      });
      fetchInventory();
      fetchStats();
    } catch (error: any) {
      console.error("Error adding inventory:", error);
      toast.error(error.message || "Failed to add blood inventory");
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('blood_requests')
        .update({ status: newStatus })
        .eq('id', requestId);

      if (error) throw error;

      toast.success(`Request ${newStatus} successfully`);
      fetchRequests();
      fetchStats();
    } catch (error: any) {
      console.error("Error updating request:", error);
      toast.error(error.message || "Failed to update request");
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'healthcare':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'donor':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'patient':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fulfilled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-red"></div>
      </div>
    );
  }

  return (
    <RoleProtectedRoute allowedRole="admin">
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-medical-red" />
                  Master Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-2">
                  Complete control and management of the blood bank system
                </p>
              </div>
              <Button variant="gradient" className="shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </div>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Total Users</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-900">{stats.totalUsers}</div>
                <p className="text-xs text-blue-600">Active system users</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Blood Banks</CardTitle>
                <MapPin className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-900">{stats.totalLocations}</div>
                <p className="text-xs text-green-600">Active locations</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-800">Blood Units</CardTitle>
                <Heart className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-900">{stats.totalBloodUnits}</div>
                <p className="text-xs text-red-600">Total available</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800">Pending Requests</CardTitle>
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-900">{stats.pendingRequests}</div>
                <p className="text-xs text-orange-600">Need attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="inventory">Blood Inventory</TabsTrigger>
              <TabsTrigger value="requests">Blood Requests</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Recent Blood Requests</CardTitle>
                    <CardDescription>Latest requests requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requests.slice(0, 5).map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{request.blood_type} - {request.units_needed} units</p>
                            <p className="text-sm text-gray-600">{request.hospital_name}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Blood Inventory Status</CardTitle>
                    <CardDescription>Current stock levels by blood type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bloodType) => {
                        const total = inventory
                          .filter(item => item.blood_type === bloodType)
                          .reduce((sum, item) => sum + item.units_available, 0);
                        
                        return (
                          <div key={bloodType} className="flex items-center justify-between">
                            <span className="font-medium">{bloodType}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-medical-red h-2 rounded-full" 
                                  style={{ width: `${Math.min((total / 100) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{total} units</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">User Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="gradient">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Create a new user account in the system</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                          placeholder="user@example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                          placeholder="Secure password"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="first_name">First Name</Label>
                          <Input
                            id="first_name"
                            value={newUser.first_name}
                            onChange={(e) => setNewUser({...newUser, first_name: e.target.value})}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="last_name">Last Name</Label>
                          <Input
                            id="last_name"
                            value={newUser.last_name}
                            onChange={(e) => setNewUser({...newUser, last_name: e.target.value})}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value as Role})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="donor">Donor</SelectItem>
                            <SelectItem value="patient">Patient</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="blood_type">Blood Type</Label>
                        <Select value={newUser.blood_type} onValueChange={(value) => setNewUser({...newUser, blood_type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newUser.phone}
                          onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                          placeholder="+1-555-0123"
                        />
                      </div>
                      <Button onClick={handleAddUser} className="w-full">
                        Create User
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Users</CardTitle>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search users..." className="w-64" />
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">
                            {user.first_name} {user.last_name}
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge className={getRoleColor(user.role)}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.blood_type || '-'}</TableCell>
                          <TableCell>{user.phone || '-'}</TableCell>
                          <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="locations" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Location Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="gradient">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Blood Bank Location</DialogTitle>
                      <DialogDescription>Add a new blood bank or donation center</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Location Name</Label>
                        <Input
                          id="name"
                          value={newLocation.name}
                          onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                          placeholder="Central Blood Bank"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={newLocation.address}
                          onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={newLocation.city}
                            onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newLocation.state}
                            onChange={(e) => setNewLocation({...newLocation, state: e.target.value})}
                            placeholder="NY"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newLocation.phone}
                            onChange={(e) => setNewLocation({...newLocation, phone: e.target.value})}
                            placeholder="+1-555-0123"
                          />
                        </div>
                        <div>
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={newLocation.capacity}
                            onChange={(e) => setNewLocation({...newLocation, capacity: e.target.value})}
                            placeholder="1000"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newLocation.email}
                          onChange={(e) => setNewLocation({...newLocation, email: e.target.value})}
                          placeholder="contact@bloodbank.com"
                        />
                      </div>
                      <Button onClick={handleAddLocation} className="w-full">
                        Add Location
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((location) => (
                  <Card key={location.id} className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-medical-red" />
                        {location.name}
                      </CardTitle>
                      <CardDescription>
                        {location.city}, {location.state}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p><strong>Address:</strong> {location.address}</p>
                        <p><strong>Phone:</strong> {location.phone}</p>
                        <p><strong>Email:</strong> {location.email}</p>
                        <p><strong>Capacity:</strong> {location.capacity} units</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="inventory" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Blood Inventory Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="gradient">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Blood Stock
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Blood Inventory</DialogTitle>
                      <DialogDescription>Add new blood stock to a location</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Select value={newInventory.location_id} onValueChange={(value) => setNewInventory({...newInventory, location_id: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((location) => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.name} - {location.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="blood_type">Blood Type</Label>
                        <Select value={newInventory.blood_type} onValueChange={(value) => setNewInventory({...newInventory, blood_type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select blood type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A-">A-</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B-">B-</SelectItem>
                            <SelectItem value="AB+">AB+</SelectItem>
                            <SelectItem value="AB-">AB-</SelectItem>
                            <SelectItem value="O+">O+</SelectItem>
                            <SelectItem value="O-">O-</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="units">Units Available</Label>
                        <Input
                          id="units"
                          type="number"
                          value={newInventory.units_available}
                          onChange={(e) => setNewInventory({...newInventory, units_available: e.target.value})}
                          placeholder="50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          type="date"
                          value={newInventory.expiry_date}
                          onChange={(e) => setNewInventory({...newInventory, expiry_date: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddInventory} className="w-full">
                        Add to Inventory
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Current Blood Inventory</CardTitle>
                  <CardDescription>All blood stock across all locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Location</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Units Available</TableHead>
                        <TableHead>Expiry Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.map((item) => {
                        const isExpiringSoon = new Date(item.expiry_date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                        const isExpired = new Date(item.expiry_date) <= new Date();
                        
                        return (
                          <TableRow key={item.id}>
                            <TableCell>
                              {item.locations?.name} - {item.locations?.city}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{item.blood_type}</Badge>
                            </TableCell>
                            <TableCell>{item.units_available}</TableCell>
                            <TableCell>{new Date(item.expiry_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {isExpired ? (
                                <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>
                              ) : isExpiringSoon ? (
                                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Expiring Soon</Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800 border-green-200">Good</Badge>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="requests" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Blood Request Management</h2>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>All Blood Requests</CardTitle>
                  <CardDescription>Manage and track blood requests from patients</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Units Needed</TableHead>
                        <TableHead>Urgency</TableHead>
                        <TableHead>Hospital</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            {request.users?.first_name} {request.users?.last_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{request.blood_type}</Badge>
                          </TableCell>
                          <TableCell>{request.units_needed}</TableCell>
                          <TableCell>
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.hospital_name}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            {request.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateRequestStatus(request.id, 'approved')}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                            {request.status === 'approved' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateRequestStatus(request.id, 'fulfilled')}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                Mark Fulfilled
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </RoleProtectedRoute>
  );
};

export default AdminDashboard;