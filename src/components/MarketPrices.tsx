import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  MapPin, 
  Calendar,
  DollarSign,
  RefreshCw,
  ExternalLink,
  Phone,
  Globe
} from 'lucide-react';

interface MarketPrice {
  id: string;
  crop: string;
  variety: string;
  market: string;
  state: string;
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  priceChangePercent: number;
  lastUpdated: string;
  unit: string;
  quality: string;
}

interface ExportCompany {
  id: string;
  name: string;
  crops: string[];
  location: string;
  contact: string;
  email: string;
  website: string;
  rating: number;
  minimumQuantity: string;
}

const MarketPrices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCrop, setCropFilter] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Mock market data
  const marketPrices: MarketPrice[] = [
    {
      id: '1',
      crop: 'Wheat',
      variety: 'HD-2967',
      market: 'Ludhiana',
      state: 'Punjab',
      currentPrice: 2650,
      previousPrice: 2580,
      priceChange: 70,
      priceChangePercent: 2.71,
      lastUpdated: '2024-01-15 09:30',
      unit: 'per quintal',
      quality: 'FAQ'
    },
    {
      id: '2',
      crop: 'Rice',
      variety: 'Basmati 1121',
      market: 'Karnal',
      state: 'Haryana',
      currentPrice: 5200,
      previousPrice: 5350,
      priceChange: -150,
      priceChangePercent: -2.80,
      lastUpdated: '2024-01-15 10:15',
      unit: 'per quintal',
      quality: 'Superior'
    },
    {
      id: '3',
      crop: 'Cotton',
      variety: 'MCU-5',
      market: 'Rajkot',
      state: 'Gujarat',
      currentPrice: 6800,
      previousPrice: 6750,
      priceChange: 50,
      priceChangePercent: 0.74,
      lastUpdated: '2024-01-15 11:00',
      unit: 'per quintal',
      quality: 'Medium'
    },
    {
      id: '4',
      crop: 'Sugarcane',
      variety: 'Co-0238',
      market: 'Muzaffarnagar',
      state: 'Uttar Pradesh',
      currentPrice: 350,
      previousPrice: 340,
      priceChange: 10,
      priceChangePercent: 2.94,
      lastUpdated: '2024-01-15 08:45',
      unit: 'per quintal',
      quality: 'Good'
    },
    {
      id: '5',
      crop: 'Maize',
      variety: 'Hybrid',
      market: 'Davangere',
      state: 'Karnataka',
      currentPrice: 2100,
      previousPrice: 2120,
      priceChange: -20,
      priceChangePercent: -0.94,
      lastUpdated: '2024-01-15 09:15',
      unit: 'per quintal',
      quality: 'FAQ'
    },
    {
      id: '6',
      crop: 'Soybean',
      variety: 'JS-335',
      market: 'Indore',
      state: 'Madhya Pradesh',
      currentPrice: 4500,
      previousPrice: 4450,
      priceChange: 50,
      priceChangePercent: 1.12,
      lastUpdated: '2024-01-15 10:30',
      unit: 'per quintal',
      quality: 'FAQ'
    }
  ];

  const exportCompanies: ExportCompany[] = [
    {
      id: '1',
      name: 'Global Agri Exports Ltd.',
      crops: ['Rice', 'Wheat', 'Spices'],
      location: 'Mumbai, Maharashtra',
      contact: '+91 22 2345 6789',
      email: 'exports@globalagri.com',
      website: 'www.globalagri.com',
      rating: 4.5,
      minimumQuantity: '100 MT'
    },
    {
      id: '2',
      name: 'Punjab Grain Export Corp.',
      crops: ['Wheat', 'Rice', 'Cotton'],
      location: 'Ludhiana, Punjab',
      contact: '+91 161 234 5678',
      email: 'info@punjabgrain.com',
      website: 'www.punjabgrain.com',
      rating: 4.3,
      minimumQuantity: '50 MT'
    },
    {
      id: '3',
      name: 'Southern Spice Traders',
      crops: ['Spices', 'Coffee', 'Tea'],
      location: 'Kochi, Kerala',
      contact: '+91 484 234 5678',
      email: 'trade@southernspice.com',
      website: 'www.southernspice.com',
      rating: 4.7,
      minimumQuantity: '25 MT'
    }
  ];

  const states = [
    { value: 'all', label: 'All States' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  ];

  const crops = [
    { value: 'all', label: 'All Crops' },
    { value: 'Wheat', label: 'Wheat' },
    { value: 'Rice', label: 'Rice' },
    { value: 'Cotton', label: 'Cotton' },
    { value: 'Sugarcane', label: 'Sugarcane' },
    { value: 'Maize', label: 'Maize' },
    { value: 'Soybean', label: 'Soybean' },
  ];

  const filteredPrices = marketPrices.filter(price => {
    const matchesSearch = price.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         price.market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'all' || price.state === selectedState;
    const matchesCrop = selectedCrop === 'all' || price.crop === selectedCrop;
    
    return matchesSearch && matchesState && matchesCrop;
  });

  const handleRefresh = () => {
    setLastRefresh(new Date());
    // In real app, this would fetch latest data
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return TrendingUp;
    if (change < 0) return TrendingDown;
    return DollarSign;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Market Prices & Export Opportunities
        </h1>
        <p className="text-muted-foreground text-lg">
          Stay updated with current market rates and connect with export companies
        </p>
      </div>

      {/* Market Prices Section */}
      <div className="space-y-6">
        <Card className="agricultural-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Live Market Prices
                </CardTitle>
                <CardDescription>
                  Real-time commodity prices from major markets across India
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search crop or market..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCrop} onValueChange={setCropFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.map((price) => {
                    const ChangeIcon = getPriceChangeIcon(price.priceChange);
                    return (
                      <TableRow key={price.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{price.crop}</div>
                            <div className="text-sm text-muted-foreground">{price.variety}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{price.market}, {price.state}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-lg">₹{price.currentPrice.toLocaleString()}</div>
                            <div className="text-sm text-muted-foreground">{price.unit}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 ${getPriceChangeColor(price.priceChange)}`}>
                            <ChangeIcon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">
                                {price.priceChange > 0 ? '+' : ''}₹{price.priceChange}
                              </div>
                              <div className="text-sm">
                                {price.priceChangePercent > 0 ? '+' : ''}{price.priceChangePercent}%
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{price.quality}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {price.lastUpdated}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {filteredPrices.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Prices Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria to find market prices.
                </p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <div>Last updated: {lastRefresh.toLocaleString()}</div>
              <div>Prices may vary by quality and quantity</div>
            </div>
          </CardContent>
        </Card>

        {/* Export Companies Section */}
        <Card className="agricultural-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Export Companies
            </CardTitle>
            <CardDescription>
              Connect with export companies for international market opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exportCompanies.map((company) => (
                <Card key={company.id} className="border">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">{company.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {company.location}
                    </CardDescription>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(company.rating) ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground ml-1">
                        {company.rating}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-sm mb-2">Specializes in:</p>
                      <div className="flex flex-wrap gap-1">
                        {company.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Min. Quantity: </span>
                        <span className="text-muted-foreground">{company.minimumQuantity}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`https://${company.website}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Alert Section */}
        <Card className="agricultural-card gradient-field">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-semibold mb-4">Stay Ahead of Market Trends</h3>
            <p className="text-muted-foreground mb-6">
              Set up price alerts and get notified when your crops reach target prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                <TrendingUp className="h-4 w-4 mr-2" />
                Set Price Alert
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Price History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketPrices;