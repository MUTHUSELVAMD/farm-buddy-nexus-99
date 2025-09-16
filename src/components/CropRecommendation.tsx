import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Sprout, 
  Droplets, 
  MapPin, 
  Calendar, 
  Ruler,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Clock
} from 'lucide-react';

interface CropRecommendation {
  id: string;
  name: string;
  variety: string;
  suitability: number;
  reason: string;
  sowingTime: string;
  harvestTime: string;
  expectedYield: string;
  waterRequirement: string;
  tips: string[];
  marketPrice: string;
}

interface FormData {
  soilType: string;
  waterAvailability: string;
  landSize: string;
  region: string;
  season: string;
  experience: string;
}

const CropRecommendation = () => {
  const [formData, setFormData] = useState<FormData>({
    soilType: '',
    waterAvailability: '',
    landSize: '',
    region: '',
    season: '',
    experience: '',
  });
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const soilTypes = [
    { value: 'clay', label: 'Clay Soil' },
    { value: 'sandy', label: 'Sandy Soil' },
    { value: 'loamy', label: 'Loamy Soil' },
    { value: 'silt', label: 'Silt Soil' },
    { value: 'peaty', label: 'Peaty Soil' },
    { value: 'chalky', label: 'Chalky Soil' },
  ];

  const waterLevels = [
    { value: 'high', label: 'High (Irrigation Available)' },
    { value: 'medium', label: 'Medium (Rain + Some Irrigation)' },
    { value: 'low', label: 'Low (Rain Dependent)' },
  ];

  const seasons = [
    { value: 'spring', label: 'Spring (Mar-May)' },
    { value: 'summer', label: 'Summer (Jun-Aug)' },
    { value: 'monsoon', label: 'Monsoon (Sep-Nov)' },
    { value: 'winter', label: 'Winter (Dec-Feb)' },
  ];

  // Mock crop data - replace with API call
  const mockRecommendations: CropRecommendation[] = [
    {
      id: '1',
      name: 'Rice',
      variety: 'Basmati',
      suitability: 95,
      reason: 'Perfect match for clay soil with high water availability',
      sowingTime: 'June-July',
      harvestTime: 'October-November',
      expectedYield: '40-50 quintals/hectare',
      waterRequirement: 'High (1200-1500mm)',
      tips: [
        'Prepare fields with proper leveling',
        'Use certified seeds for better yield',
        'Apply organic manure before sowing',
        'Monitor for pest attacks regularly'
      ],
      marketPrice: '₹25-30/kg'
    },
    {
      id: '2',
      name: 'Wheat',
      variety: 'HD-2967',
      suitability: 88,
      reason: 'Good alternative with lower water requirement',
      sowingTime: 'November-December',
      harvestTime: 'March-April',
      expectedYield: '35-45 quintals/hectare',
      waterRequirement: 'Medium (450-650mm)',
      tips: [
        'Sow at optimal temperature (18-22°C)',
        'Ensure proper seed spacing',
        'Apply nitrogen in 3 splits',
        'Control weeds at early stage'
      ],
      marketPrice: '₹22-26/kg'
    },
    {
      id: '3',
      name: 'Sugarcane',
      variety: 'Co-0238',
      suitability: 82,
      reason: 'Suitable for clay soil and high water conditions',
      sowingTime: 'February-March',
      harvestTime: 'December-January (Next year)',
      expectedYield: '800-1000 quintals/hectare',
      waterRequirement: 'Very High (1800-2200mm)',
      tips: [
        'Use disease-free setts for planting',
        'Maintain proper row spacing (90cm)',
        'Regular irrigation and fertilization',
        'Harvest at optimal maturity'
      ],
      marketPrice: '₹350-380/quintal'
    }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock recommendation logic based on form data
    let filteredRecommendations = [...mockRecommendations];
    
    // Simple filtering logic for demo
    if (formData.waterAvailability === 'low') {
      filteredRecommendations = filteredRecommendations.filter(crop => 
        !crop.waterRequirement.includes('High')
      );
    }
    
    setRecommendations(filteredRecommendations);
    setShowResults(true);
    setIsLoading(false);
  };

  const getSuitabilityColor = (score: number) => {
    if (score >= 90) return 'bg-success text-success-foreground';
    if (score >= 80) return 'bg-warning text-warning-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  const getSuitabilityIcon = (score: number) => {
    if (score >= 90) return CheckCircle;
    if (score >= 80) return AlertCircle;
    return TrendingUp;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Crop Recommendation System
        </h1>
        <p className="text-muted-foreground text-lg">
          Get personalized crop recommendations based on your land conditions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <Card className="agricultural-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-primary" />
              Farm Details
            </CardTitle>
            <CardDescription>
              Provide information about your farm for personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="soilType" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Soil Type
                  </Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => handleInputChange('soilType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((soil) => (
                        <SelectItem key={soil.value} value={soil.value}>
                          {soil.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="waterAvailability" className="flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Water Availability
                  </Label>
                  <Select
                    value={formData.waterAvailability}
                    onValueChange={(value) => handleInputChange('waterAvailability', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select water level" />
                    </SelectTrigger>
                    <SelectContent>
                      {waterLevels.map((water) => (
                        <SelectItem key={water.value} value={water.value}>
                          {water.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landSize" className="flex items-center gap-2">
                    <Ruler className="h-4 w-4" />
                    Land Size (Hectares)
                  </Label>
                  <Input
                    id="landSize"
                    type="number"
                    placeholder="e.g., 2.5"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange('landSize', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Region/State
                  </Label>
                  <Input
                    id="region"
                    placeholder="e.g., Punjab, Maharashtra"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="season" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Preferred Season
                  </Label>
                  <Select
                    value={formData.season}
                    onValueChange={(value) => handleInputChange('season', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      {seasons.map((season) => (
                        <SelectItem key={season.value} value={season.value}>
                          {season.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Analyzing...' : 'Get Recommendations'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {showResults && recommendations.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-foreground">
                Recommended Crops
              </h2>
              {recommendations.map((crop) => {
                const SuitabilityIcon = getSuitabilityIcon(crop.suitability);
                return (
                  <Card key={crop.id} className="agricultural-card">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{crop.name}</CardTitle>
                          <CardDescription className="text-sm">
                            Variety: {crop.variety}
                          </CardDescription>
                        </div>
                        <Badge className={getSuitabilityColor(crop.suitability)}>
                          <SuitabilityIcon className="h-3 w-3 mr-1" />
                          {crop.suitability}% Match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {crop.reason}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Sowing</p>
                            <p className="text-muted-foreground">{crop.sowingTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Harvest</p>
                            <p className="text-muted-foreground">{crop.harvestTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Expected Yield</p>
                            <p className="text-muted-foreground">{crop.expectedYield}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-primary" />
                          <div>
                            <p className="font-medium">Water Need</p>
                            <p className="text-muted-foreground">{crop.waterRequirement}</p>
                          </div>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="font-medium text-sm mb-2">Growing Tips:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {crop.tips.map((tip, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm font-medium">Market Price:</span>
                        <Badge variant="outline" className="text-success">
                          {crop.marketPrice}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          )}
          
          {showResults && recommendations.length === 0 && (
            <Card className="agricultural-card text-center py-8">
              <CardContent>
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recommendations Found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your parameters to get better recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;