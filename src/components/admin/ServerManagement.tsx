
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Server, Globe, Zap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ServerManagement = () => {
  const { toast } = useToast();
  const [servers, setServers] = useState([
    {
      id: 1,
      name: "US East",
      country: "United States",
      city: "New York",
      ip: "192.168.1.100",
      port: "1194",
      protocol: "OpenVPN",
      type: "Premium",
      status: "Online",
      load: 45,
      users: 234
    },
    {
      id: 2,
      name: "UK London",
      country: "United Kingdom", 
      city: "London",
      ip: "192.168.1.101",
      port: "1194",
      protocol: "OpenVPN",
      type: "Free",
      status: "Online",
      load: 78,
      users: 567
    },
    {
      id: 3,
      name: "Singapore",
      country: "Singapore",
      city: "Singapore",
      ip: "192.168.1.102",
      port: "1194", 
      protocol: "OpenVPN",
      type: "Premium",
      status: "Maintenance",
      load: 0,
      users: 0
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newServer, setNewServer] = useState({
    name: "",
    country: "",
    city: "",
    ip: "",
    port: "1194",
    protocol: "OpenVPN",
    type: "Free"
  });

  const handleAddServer = () => {
    if (!newServer.name || !newServer.country || !newServer.ip) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const server = {
      id: Date.now(),
      ...newServer,
      status: "Online",
      load: 0,
      users: 0
    };

    setServers([...servers, server]);
    setNewServer({
      name: "",
      country: "",
      city: "",
      ip: "",
      port: "1194",
      protocol: "OpenVPN",
      type: "Free"
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Server added successfully"
    });
  };

  const handleDeleteServer = (id: number) => {
    setServers(servers.filter(server => server.id !== id));
    toast({
      title: "Success",
      description: "Server deleted successfully"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-500";
      case "Offline": return "bg-red-500";
      case "Maintenance": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 50) return "text-green-600";
    if (load < 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Server Management</h2>
          <p className="text-gray-600">Manage your VPN servers and configurations</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Server
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Server</DialogTitle>
              <DialogDescription>
                Configure a new VPN server for your network
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Server Name *</Label>
                <Input
                  id="name"
                  value={newServer.name}
                  onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                  placeholder="e.g., US West"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country *</Label>
                  <Input
                    id="country"
                    value={newServer.country}
                    onChange={(e) => setNewServer({...newServer, country: e.target.value})}
                    placeholder="United States"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newServer.city}
                    onChange={(e) => setNewServer({...newServer, city: e.target.value})}
                    placeholder="Los Angeles"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ip">IP Address *</Label>
                  <Input
                    id="ip"
                    value={newServer.ip}
                    onChange={(e) => setNewServer({...newServer, ip: e.target.value})}
                    placeholder="192.168.1.100"
                  />
                </div>
                <div>
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    value={newServer.port}
                    onChange={(e) => setNewServer({...newServer, port: e.target.value})}
                    placeholder="1194"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Protocol</Label>
                  <Select value={newServer.protocol} onValueChange={(value) => setNewServer({...newServer, protocol: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenVPN">OpenVPN</SelectItem>
                      <SelectItem value="IKEv2">IKEv2</SelectItem>
                      <SelectItem value="WireGuard">WireGuard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Server Type</Label>
                  <Select value={newServer.type} onValueChange={(value) => setNewServer({...newServer, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddServer}>
                  Add Server
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {servers.map((server) => (
          <Card key={server.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Server className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{server.country}</span>
                      {server.city && <span>• {server.city}</span>}
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600">{server.ip}:{server.port}</span>
                      <Badge variant="outline">{server.protocol}</Badge>
                      <Badge variant={server.type === "Premium" ? "default" : "secondary"}>
                        {server.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} mb-1`}></div>
                    <span className="text-xs text-gray-600">{server.status}</span>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-semibold ${getLoadColor(server.load)}`}>
                      {server.load}%
                    </div>
                    <span className="text-xs text-gray-600">Load</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{server.users}</div>
                    <span className="text-xs text-gray-600">Users</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteServer(server.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServerManagement;
