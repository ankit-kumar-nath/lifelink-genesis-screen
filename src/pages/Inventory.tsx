
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, AlertTriangle, CheckCircle } from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock blood inventory data
  const bloodInventory = [
    {
      bloodType: "A+",
      unitsAvailable: 25,
      status: "good",
      lastUpdated: "2024-01-15",
      expiryDate: "2024-02-15",
      location: "Main Blood Bank"
    },
    {
      bloodType: "A-",
      unitsAvailable: 8,
      status: "low",
      lastUpdated: "2024-01-14",
      expiryDate: "2024-02-10",
      location: "Main Blood Bank"
    },
    {
      bloodType: "B+",
      unitsAvailable: 18,
      status: "good",
      lastUpdated: "2024-01-15",
      expiryDate: "2024-02-20",
      location: "Main Blood Bank"
    },
    {
      bloodType: "B-",
      unitsAvailable: 3,
      status: "critical",
      lastUpdated: "2024-01-13",
      expiryDate: "2024-02-05",
      location: "Main Blood Bank"
    },
    {
      bloodType: "AB+",
      unitsAvailable: 12,
      status: "good",
      lastUpdated: "2024-01-15",
      expiryDate: "2024-02-18",
      location: "Main Blood Bank"
    },
    {
      bloodType: "AB-",
      unitsAvailable: 5,
      status: "low",
      lastUpdated: "2024-01-14",
      expiryDate: "2024-02-12",
      location: "Main Blood Bank"
    },
    {
      bloodType: "O+",
      unitsAvailable: 32,
      status: "good",
      lastUpdated: "2024-01-15",
      expiryDate: "2024-02-25",
      location: "Main Blood Bank"
    },
    {
      bloodType: "O-",
      unitsAvailable: 6,
      status: "low",
      lastUpdated: "2024-01-14",
      expiryDate: "2024-02-08",
      location: "Main Blood Bank"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-100 text-green-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "low":
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const filteredInventory = bloodInventory.filter(item => {
    const matchesSearch = item.bloodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalUnits = bloodInventory.reduce((sum, item) => sum + item.unitsAvailable, 0);
  const criticalTypes = bloodInventory.filter(item => item.status === "critical").length;
  const lowTypes = bloodInventory.filter(item => item.status === "low").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <Header />
      
      <main className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Blood Inventory
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real-time blood stock levels and availability across our network
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{totalUnits}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Blood Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">8</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Low Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowTypes}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Critical</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{criticalTypes}</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search by blood type or location</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="search"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="md:w-48">
                  <Label htmlFor="filter">Filter by status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="mt-1">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="good">Good Stock</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Blood Stock Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Blood Type</TableHead>
                      <TableHead>Units Available</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Expiry Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium text-lg">
                          {item.bloodType}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {item.unitsAvailable} units
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(item.status)}
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.lastUpdated}</TableCell>
                        <TableCell>{item.expiryDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="mt-8 bg-red-50 border-red-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-red-800">Emergency Blood Request</h3>
              </div>
              <p className="text-red-700 mb-4">
                Need urgent blood? Contact our emergency hotline for immediate assistance.
              </p>
              <Button className="bg-red-600 hover:bg-red-700">
                Call Emergency Hotline: 911
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Inventory;
