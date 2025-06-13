import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Server, 
  Settings, 
  DollarSign, 
  Smartphone, 
  Gift,
  BarChart3,
  Shield,
  MonitorPlay
} from "lucide-react";
import { useState } from "react";
import ServerManagement from "@/components/admin/ServerManagement";
import UserManagement from "@/components/admin/UserManagement";
import AdManagement from "@/components/admin/AdManagement";
import MultiAdNetworkManager from "@/components/admin/MultiAdNetworkManager";
import SubscriptionPlans from "@/components/admin/SubscriptionPlans";
import RewardsSystem from "@/components/admin/RewardsSystem";
import AppSettings from "@/components/admin/AppSettings";
import DashboardStats from "@/components/admin/DashboardStats";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">VPN Admin Panel</h1>
          <p className="text-gray-600">Manage your VPN application and users</p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="servers" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              Servers
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="ads" className="flex items-center gap-2">
              <MonitorPlay className="w-4 h-4" />
              Ads
            </TabsTrigger>
            <TabsTrigger value="multi-ads" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Multi Ads
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Plans
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="w-4 h-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardStats />
          </TabsContent>

          <TabsContent value="servers">
            <ServerManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="ads">
            <AdManagement />
          </TabsContent>

          <TabsContent value="multi-ads">
            <MultiAdNetworkManager />
          </TabsContent>

          <TabsContent value="plans">
            <SubscriptionPlans />
          </TabsContent>

          <TabsContent value="rewards">
            <RewardsSystem />
          </TabsContent>

          <TabsContent value="settings">
            <AppSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
