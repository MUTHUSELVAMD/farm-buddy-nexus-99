import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  MapPin, 
  Tractor, 
  MessageCircle, 
  Phone,
  Star,
  Clock,
  Search,
  Plus,
  CheckCircle,
  Calendar
} from 'lucide-react';

interface Farmer {
  id: string;
  name: string;
  location: string;
  distance: string;
  crops: string[];
  rating: number;
  experience: string;
  verified: boolean;
  contact: string;
}

interface Machine {
  id: string;
  name: string;
  type: string;
  owner: string;
  location: string;
  pricePerDay: number;
  availability: string;
  condition: 'Excellent' | 'Good' | 'Fair';
  contact: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  location: string;
  isJoined: boolean;
}

const Community = () => {
  const [activeView, setActiveView] = useState<'map' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const nearbyFarmers: Farmer[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      location: 'Ludhiana, Punjab',
      distance: '2.5 km',
      crops: ['Wheat', 'Rice', 'Sugarcane'],
      rating: 4.8,
      experience: '15 years',
      verified: true,
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      location: 'Patiala, Punjab',
      distance: '8.2 km',
      crops: ['Cotton', 'Maize', 'Mustard'],
      rating: 4.6,
      experience: '12 years',
      verified: true,
      contact: '+91 98765 43211'
    },
    {
      id: '3',
      name: 'Arun Singh',
      location: 'Amritsar, Punjab',
      distance: '15.1 km',
      crops: ['Rice', 'Potato', 'Onion'],
      rating: 4.7,
      experience: '20 years',
      verified: false,
      contact: '+91 98765 43212'
    }
  ];

  const availableMachines: Machine[] = [
    {
      id: '1',
      name: 'John Deere 5050D',
      type: 'Tractor',
      owner: 'Rajesh Kumar',
      location: 'Ludhiana, Punjab',
      pricePerDay: 2500,
      availability: 'Available Now',
      condition: 'Excellent',
      contact: '+91 98765 43210'
    },
    {
      id: '2',
      name: 'Mahindra Arjun 605',
      type: 'Tractor',
      owner: 'Suresh Patel',
      location: 'Bathinda, Punjab',
      pricePerDay: 2200,
      availability: 'Available from Tomorrow',
      condition: 'Good',
      contact: '+91 98765 43213'
    },
    {
      id: '3',
      name: 'Combine Harvester',
      type: 'Harvester',
      owner: 'Arun Singh',
      location: 'Amritsar, Punjab',
      pricePerDay: 8000,
      availability: 'Available Next Week',
      condition: 'Good',
      contact: '+91 98765 43212'
    }
  ];

  const farmingGroups: Group[] = [
    {
      id: '1',
      name: 'Punjab Wheat Growers',
      description: 'Community for wheat farmers in Punjab region sharing best practices and market insights.',
      members: 1247,
      category: 'Crop Specific',
      location: 'Punjab',
      isJoined: true
    },
    {
      id: '2',
      name: 'Organic Farming Network',
      description: 'Dedicated to promoting sustainable and organic farming practices across India.',
      members: 892,
      category: 'Farming Practice',
      location: 'All India',
      isJoined: false
    },
    {
      id: '3',
      name: 'Young Farmers Circle',
      description: 'Platform for young and new farmers to learn, connect, and grow together.',
      members: 654,
      category: 'Age Group',
      location: 'North India',
      isJoined: false
    }
  ];

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'bg-success text-success-foreground';
      case 'Good': return 'bg-primary text-primary-foreground';
      case 'Fair': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Farming Community Hub
        </h1>
        <p className="text-muted-foreground text-lg">
          Connect with nearby farmers, share equipment, and join farming groups
        </p>
      </div>

      <Tabs defaultValue="farmers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="farmers">Nearby Farmers</TabsTrigger>
          <TabsTrigger value="machines">Equipment Sharing</TabsTrigger>
          <TabsTrigger value="groups">Farming Groups</TabsTrigger>
        </TabsList>

        {/* Nearby Farmers Tab */}
        <TabsContent value="farmers" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search farmers by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={activeView === 'list' ? 'default' : 'outline'}
                onClick={() => setActiveView('list')}
              >
                List View
              </Button>
              <Button 
                variant={activeView === 'map' ? 'default' : 'outline'}
                onClick={() => setActiveView('map')}
              >
                Map View
              </Button>
            </div>
          </div>

          {activeView === 'list' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyFarmers.map((farmer) => (
                <Card key={farmer.id} className="agricultural-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {farmer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {farmer.name}
                            {farmer.verified && (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {farmer.location} • {farmer.distance}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{farmer.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{farmer.experience}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Specializes in:</p>
                      <div className="flex flex-wrap gap-2">
                        {farmer.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="agricultural-card h-96">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Map view will show nearby farmers and their locations
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Equipment Sharing Tab */}
        <TabsContent value="machines" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-semibold">Available Equipment</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              List Your Equipment
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableMachines.map((machine) => (
              <Card key={machine.id} className="agricultural-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{machine.name}</CardTitle>
                      <CardDescription>{machine.type}</CardDescription>
                    </div>
                    <Badge className={getConditionColor(machine.condition)}>
                      {machine.condition}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Owner: {machine.owner}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{machine.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{machine.availability}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{machine.pricePerDay}</p>
                      <p className="text-sm text-muted-foreground">per day</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Owner
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Farming Groups Tab */}
        <TabsContent value="groups" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h2 className="text-2xl font-semibold">Farming Groups</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Group
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmingGroups.map((group) => (
              <Card key={group.id} className="agricultural-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {group.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{group.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {group.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{group.members.toLocaleString()} members</span>
                    </div>
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full"
                    variant={group.isJoined ? 'outline' : 'default'}
                  >
                    {group.isJoined ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Join Group
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;