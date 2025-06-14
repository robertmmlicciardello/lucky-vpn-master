
import { 
  Users, 
  Server, 
  Settings, 
  DollarSign, 
  Smartphone, 
  Gift,
  BarChart3,
  Shield,
  MonitorPlay,
  Sparkles,
  CreditCard
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigationItems = [
  { value: "dashboard", label: "Dashboard", icon: BarChart3, color: "text-blue-600" },
  { value: "servers", label: "Servers", icon: Server, color: "text-green-600" },
  { value: "users", label: "Users", icon: Users, color: "text-purple-600" },
  { value: "ads", label: "Ads", icon: MonitorPlay, color: "text-orange-600" },
  { value: "multi-ads", label: "Multi Ads", icon: Shield, color: "text-red-600" },
  { value: "plans", label: "Plans", icon: DollarSign, color: "text-yellow-600" },
  { value: "payments", label: "Payments", icon: CreditCard, color: "text-emerald-600" },
  { value: "rewards", label: "Rewards", icon: Gift, color: "text-pink-600" },
  { value: "notifications", label: "Notifications", icon: Smartphone, color: "text-indigo-600" },
  { value: "support", label: "Support", icon: Settings, color: "text-cyan-600" },
  { value: "blog", label: "Blog", icon: Settings, color: "text-teal-600" },
  { value: "leaderboard", label: "Leaderboard", icon: Settings, color: "text-violet-600" },
  { value: "settings", label: "Settings", icon: Settings, color: "text-gray-600" }
];

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">VPN Admin</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton
                      isActive={activeTab === item.value}
                      onClick={() => setActiveTab(item.value)}
                      className="flex items-center gap-3 p-3 rounded-lg transition-all"
                    >
                      <IconComponent className={`w-5 h-5 ${item.color}`} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
