
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MonitorPlay, 
  Smartphone, 
  Gift, 
  Eye, 
  TrendingUp,
  Settings2,
  Facebook,
  Youtube
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AdNetworkType, AdNetworkConfiguration } from "@/api/endpoints";

const MultiAdNetworkManager = () => {
  const { toast } = useToast();
  const [adConfig, setAdConfig] = useState<AdNetworkConfiguration>({
    admob: {
      enabled: true,
      app_id: "ca-app-pub-3940256099942544~3347511713",
      banner_id: "ca-app-pub-3940256099942544/6300978111",
      interstitial_id: "ca-app-pub-3940256099942544/1033173712",
      rewarded_id: "ca-app-pub-3940256099942544/5224354917"
    },
    facebook: {
      enabled: false,
      placement_id: "",
      banner_id: "",
      interstitial_id: "",
      rewarded_id: ""
    },
    applovin: {
      enabled: false,
      api_key: "",
      banner_id: "",
      interstitial_id: "",
      rewarded_id: ""
    },
    unity: {
      enabled: false,
      app_id: "",
      banner_id: "",
      interstitial_id: "",
      rewarded_id: ""
    },
    adcolony: {
      enabled: false,
      app_id: "",
      banner_id: "",
      interstitial_id: "",
      rewarded_id: ""
    },
    startapp: {
      enabled: false,
      app_id: "",
      banner_id: "",
      interstitial_id: "",
      rewarded_id: ""
    },
    primary_rewarded_network: 'admob',
    primary_interstitial_network: 'admob',
    primary_banner_network: 'admob',
    ad_frequency: 3,
    reward_points: 50
  });

  const adNetworks = [
    { 
      id: 'admob' as AdNetworkType, 
      name: 'Google AdMob', 
      icon: MonitorPlay, 
      color: 'text-green-600',
      bgColor: 'bg-green-50' 
    },
    { 
      id: 'facebook' as AdNetworkType, 
      name: 'Facebook Audience Network', 
      icon: Facebook, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50' 
    },
    { 
      id: 'applovin' as AdNetworkType, 
      name: 'AppLovin MAX', 
      icon: TrendingUp, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50' 
    },
    { 
      id: 'unity' as AdNetworkType, 
      name: 'Unity Ads', 
      icon: Smartphone, 
      color: 'text-red-600',
      bgColor: 'bg-red-50' 
    },
    { 
      id: 'adcolony' as AdNetworkType, 
      name: 'AdColony', 
      icon: Eye, 
      color: 'text-orange-600',
      bgColor: 'bg-orange-50' 
    },
    { 
      id: 'startapp' as AdNetworkType, 
      name: 'StartApp', 
      icon: Youtube, 
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50' 
    }
  ];

  const handleSaveConfig = () => {
    toast({
      title: "Success",
      description: "Ad network configuration saved successfully"
    });
  };

  const updateNetworkConfig = (network: AdNetworkType, field: string, value: any) => {
    setAdConfig(prev => ({
      ...prev,
      [network]: {
        ...prev[network],
        [field]: value
      }
    }));
  };

  const updatePrimaryNetwork = (adType: 'rewarded' | 'interstitial' | 'banner', network: AdNetworkType) => {
    const fieldName = `primary_${adType}_network` as keyof AdNetworkConfiguration;
    setAdConfig(prev => ({
      ...prev,
      [fieldName]: network
    }));
  };

  const renderNetworkConfig = (network: typeof adNetworks[0]) => {
    const config = adConfig[network.id];
    const IconComponent = network.icon;

    return (
      <Card key={network.id}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${network.bgColor} rounded-lg flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${network.color}`} />
              </div>
              <div>
                <CardTitle className="text-lg">{network.name}</CardTitle>
                <CardDescription>Configure {network.name} settings</CardDescription>
              </div>
            </div>
            <Switch
              checked={config.enabled}
              onCheckedChange={(enabled) => updateNetworkConfig(network.id, 'enabled', enabled)}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {config.enabled && (
            <>
              {network.id === 'admob' && (
                <div>
                  <Label htmlFor={`${network.id}-app-id`}>App ID</Label>
                  <Input
                    id={`${network.id}-app-id`}
                    value={config.app_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'app_id', e.target.value)}
                    placeholder="ca-app-pub-xxxxxxxxxxxxxxxx~xxxxxxxxxx"
                  />
                </div>
              )}

              {network.id === 'facebook' && (
                <div>
                  <Label htmlFor={`${network.id}-placement-id`}>Placement ID</Label>
                  <Input
                    id={`${network.id}-placement-id`}
                    value={config.placement_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'placement_id', e.target.value)}
                    placeholder="YOUR_PLACEMENT_ID"
                  />
                </div>
              )}

              {network.id === 'applovin' && (
                <div>
                  <Label htmlFor={`${network.id}-api-key`}>SDK Key</Label>
                  <Input
                    id={`${network.id}-api-key`}
                    value={config.api_key || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'api_key', e.target.value)}
                    placeholder="YOUR_SDK_KEY"
                  />
                </div>
              )}

              {(network.id === 'unity' || network.id === 'adcolony' || network.id === 'startapp') && (
                <div>
                  <Label htmlFor={`${network.id}-app-id`}>App ID</Label>
                  <Input
                    id={`${network.id}-app-id`}
                    value={config.app_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'app_id', e.target.value)}
                    placeholder="Your App ID"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor={`${network.id}-banner`}>Banner Ad ID</Label>
                  <Input
                    id={`${network.id}-banner`}
                    value={config.banner_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'banner_id', e.target.value)}
                    placeholder="Banner Unit ID"
                  />
                </div>
                <div>
                  <Label htmlFor={`${network.id}-interstitial`}>Interstitial Ad ID</Label>
                  <Input
                    id={`${network.id}-interstitial`}
                    value={config.interstitial_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'interstitial_id', e.target.value)}
                    placeholder="Interstitial Unit ID"
                  />
                </div>
                <div>
                  <Label htmlFor={`${network.id}-rewarded`}>Rewarded Ad ID</Label>
                  <Input
                    id={`${network.id}-rewarded`}
                    value={config.rewarded_id || ''}
                    onChange={(e) => updateNetworkConfig(network.id, 'rewarded_id', e.target.value)}
                    placeholder="Rewarded Unit ID"
                  />
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  const enabledNetworks = adNetworks.filter(network => adConfig[network.id].enabled);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Multi Ad Network Management</h2>
        <p className="text-gray-600">Configure multiple ad networks and control ad placements</p>
      </div>

      <Tabs defaultValue="networks" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="networks">Ad Networks</TabsTrigger>
          <TabsTrigger value="primary">Primary Networks</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="networks" className="space-y-4">
          {adNetworks.map(renderNetworkConfig)}
        </TabsContent>

        <TabsContent value="primary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Ad Network Selection</CardTitle>
              <CardDescription>
                Choose which ad network to use as primary for different ad types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Primary Rewarded Video Network</Label>
                  <Select
                    value={adConfig.primary_rewarded_network}
                    onValueChange={(value: AdNetworkType) => updatePrimaryNetwork('rewarded', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {enabledNetworks.map(network => (
                        <SelectItem key={network.id} value={network.id}>
                          {network.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Primary Interstitial Network</Label>
                  <Select
                    value={adConfig.primary_interstitial_network}
                    onValueChange={(value: AdNetworkType) => updatePrimaryNetwork('interstitial', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {enabledNetworks.map(network => (
                        <SelectItem key={network.id} value={network.id}>
                          {network.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Primary Banner Network</Label>
                  <Select
                    value={adConfig.primary_banner_network}
                    onValueChange={(value: AdNetworkType) => updatePrimaryNetwork('banner', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {enabledNetworks.map(network => (
                        <SelectItem key={network.id} value={network.id}>
                          {network.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="ad-frequency">Interstitial Ad Frequency</Label>
                  <Input
                    i d="ad-frequency"
                    type="number"
                    min="1"
                    max="10"
                    value={adConfig.ad_frequency}
                    onChange={(e) => setAdConfig(prev => ({ ...prev, ad_frequency: parseInt(e.target.value) }))}
                  />
                  <p className="text-xs text-gray-600 mt-1">Show interstitial ad every X connections</p>
                </div>

                <div>
                  <Label htmlFor="reward-points">Reward Points per Video</Label>
                  <Input
                    id="reward-points"
                    type="number"
                    min="10"
                    max="500"
                    value={adConfig.reward_points}
                    onChange={(e) => setAdConfig(prev => ({ ...prev, reward_points: parseInt(e.target.value) }))}
                  />
                  <p className="text-xs text-gray-600 mt-1">Points awarded for watching rewarded videos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Primary Networks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Gift className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Rewarded:</span>
                  <Badge variant="secondary">
                    {adNetworks.find(n => n.id === adConfig.primary_rewarded_network)?.name}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Interstitial:</span>
                  <Badge variant="secondary">
                    {adNetworks.find(n => n.id === adConfig.primary_interstitial_network)?.name}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <MonitorPlay className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Banner:</span>
                  <Badge variant="secondary">
                    {adNetworks.find(n => n.id === adConfig.primary_banner_network)?.name}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ad Performance (Today)</CardTitle>
              <CardDescription>
                Performance statistics across all ad networks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Eye className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">2,547</div>
                  <div className="text-sm text-gray-600">Total Impressions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MonitorPlay className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">189</div>
                  <div className="text-sm text-gray-600">Interstitial Views</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">356</div>
                  <div className="text-sm text-gray-600">Rewarded Videos</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">$45.82</div>
                  <div className="text-sm text-gray-600">Est. Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Network Performance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {enabledNetworks.map(network => {
                  const IconComponent = network.icon;
                  return (
                    <div key={network.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${network.bgColor} rounded flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 ${network.color}`} />
                        </div>
                        <span className="font-medium">{network.name}</span>
                      </div>
                      <div className="flex space-x-6 text-sm text-gray-600">
                        <div>Impressions: <span className="font-medium text-gray-900">
                          {Math.floor(Math.random() * 1000 + 100)}
                        </span></div>
                        <div>Revenue: <span className="font-medium text-green-600">
                          ${(Math.random() * 20 + 5).toFixed(2)}
                        </span></div>
                        <div>Fill Rate: <span className="font-medium text-blue-600">
                          {(Math.random() * 30 + 70).toFixed(1)}%
                        </span></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveConfig} className="px-8">
          <Settings2 className="w-4 h-4 mr-2" />
          Save Ad Configuration
        </Button>
      </div>
    </div>
  );
};

export default MultiAdNetworkManager;

