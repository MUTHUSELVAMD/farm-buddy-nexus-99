import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  ExternalLink, 
  Calendar,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  MessageCircle
} from 'lucide-react';

interface PolicyScheme {
  id: string;
  name: string;
  description: string;
  category: string;
  eligibility: string[];
  benefits: string[];
  applicationDeadline: string;
  maxAmount: string;
  status: 'Active' | 'Upcoming' | 'Expiring Soon';
  beneficiaries: number;
  applicationLink: string;
  documents: string[];
}

const GovernmentPolicies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'credit', label: 'Credit & Loans' },
    { value: 'subsidy', label: 'Subsidies' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'technology', label: 'Technology' },
    { value: 'organic', label: 'Organic Farming' },
  ];

  const statuses = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'expiring', label: 'Expiring Soon' },
  ];

  // Mock schemes data
  const policySchemes: PolicyScheme[] = [
    {
      id: '1',
      name: 'PM-KISAN Samman Nidhi',
      description: 'Direct income support scheme providing ₹6,000 per year to small and marginal farmers.',
      category: 'credit',
      eligibility: [
        'Small and marginal farmers with land up to 2 hectares',
        'Valid Aadhaar card required',
        'Bank account linked with Aadhaar',
        'Land ownership documents'
      ],
      benefits: [
        '₹6,000 per year in three installments',
        'Direct bank transfer',
        'No processing fee',
        'Automatic renewal if eligible'
      ],
      applicationDeadline: '2024-12-31',
      maxAmount: '₹6,000 per year',
      status: 'Active',
      beneficiaries: 11000000,
      applicationLink: 'https://pmkisan.gov.in',
      documents: ['Aadhaar Card', 'Bank Passbook', 'Land Records', 'Passport Photo']
    },
    {
      id: '2',
      name: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme providing financial support to farmers in case of crop failure.',
      category: 'insurance',
      eligibility: [
        'All farmers including sharecroppers and tenant farmers',
        'Must have insurable interest in the crop',
        'Land documents or agreement proof',
        'Valid bank account'
      ],
      benefits: [
        'Premium subsidy up to 90%',
        'Coverage for all stages of crop cycle',
        'Quick claim settlement',
        'Use of technology for accurate assessment'
      ],
      applicationDeadline: '2024-06-30',
      maxAmount: 'Up to ₹2,00,000 per hectare',
      status: 'Active',
      beneficiaries: 5500000,
      applicationLink: 'https://pmfby.gov.in',
      documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records', 'Sowing Certificate']
    },
    {
      id: '3',
      name: 'National Mission for Sustainable Agriculture',
      description: 'Promotes sustainable farming practices and climate-resilient agriculture.',
      category: 'technology',
      eligibility: [
        'Individual farmers and farmer producer organizations',
        'Minimum 0.25 hectare land holding',
        'Willingness to adopt sustainable practices',
        'Valid registration documents'
      ],
      benefits: [
        'Financial assistance for sustainable practices',
        'Training and capacity building',
        'Subsidized equipment and inputs',
        'Technical support'
      ],
      applicationDeadline: '2024-09-30',
      maxAmount: 'Up to ₹50,000 per hectare',
      status: 'Active',
      beneficiaries: 2800000,
      applicationLink: 'https://nmsa.dac.gov.in',
      documents: ['Land Records', 'Identity Proof', 'Bank Account', 'Project Proposal']
    },
    {
      id: '4',
      name: 'Paramparagat Krishi Vikas Yojana',
      description: 'Promotes organic farming through cluster-based approach and financial assistance.',
      category: 'organic',
      eligibility: [
        'Farmers willing to adopt organic farming',
        'Minimum cluster size of 50 acres',
        'Group of at least 50 farmers',
        'Land suitable for organic farming'
      ],
      benefits: [
        '₹50,000 per hectare for 3 years',
        'Organic certification support',
        'Marketing assistance',
        'Training and handholding'
      ],
      applicationDeadline: '2024-08-15',
      maxAmount: '₹50,000 per hectare',
      status: 'Expiring Soon',
      beneficiaries: 890000,
      applicationLink: 'https://pgsindia-ncof.gov.in',
      documents: ['Land Records', 'Group Formation Certificate', 'Bank Details', 'Soil Health Card']
    },
    {
      id: '5',
      name: 'Agricultural Infrastructure Fund',
      description: 'Provides medium to long-term debt financing for post-harvest infrastructure.',
      category: 'credit',
      eligibility: [
        'Farmers, FPOs, and agri-entrepreneurs',
        'Viable project proposal',
        'Minimum project cost of ₹25 lakhs',
        'Collateral security or guarantee'
      ],
      benefits: [
        'Interest subvention of 3%',
        'Credit guarantee coverage',
        'Flexible repayment terms',
        'Quick approval process'
      ],
      applicationDeadline: '2025-03-31',
      maxAmount: 'Up to ₹2 crores',
      status: 'Upcoming',
      beneficiaries: 150000,
      applicationLink: 'https://agriinfra.dac.gov.in',
      documents: ['Project Report', 'Financial Statements', 'Land Documents', 'Registration Certificate']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Upcoming': return 'bg-primary text-primary-foreground';
      case 'Expiring Soon': return 'bg-warning text-warning-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return CheckCircle;
      case 'Upcoming': return Calendar;
      case 'Expiring Soon': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'credit': return 'bg-blue-100 text-blue-800';
      case 'subsidy': return 'bg-green-100 text-green-800';
      case 'insurance': return 'bg-purple-100 text-purple-800';
      case 'technology': return 'bg-orange-100 text-orange-800';
      case 'organic': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredSchemes = policySchemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || 
                         scheme.status.toLowerCase().replace(' ', '') === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Government Policies & Schemes
        </h1>
        <p className="text-muted-foreground text-lg">
          Explore available government schemes, subsidies, and credit lines for farmers
        </p>
      </div>

      {/* Filters */}
      <Card className="agricultural-card mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schemes Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => {
          const StatusIcon = getStatusIcon(scheme.status);
          return (
            <Card key={scheme.id} className="agricultural-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{scheme.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={getCategoryColor(scheme.category)}>
                        {scheme.category.charAt(0).toUpperCase() + scheme.category.slice(1)}
                      </Badge>
                      <Badge className={getStatusColor(scheme.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {scheme.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-base">
                  {scheme.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Max Amount</p>
                      <p className="text-muted-foreground">{scheme.maxAmount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Deadline</p>
                      <p className="text-muted-foreground">
                        {new Date(scheme.applicationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Beneficiaries</p>
                      <p className="text-muted-foreground">
                        {scheme.beneficiaries.toLocaleString()} farmers supported
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eligibility */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Eligibility Criteria
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {scheme.eligibility.slice(0, 3).map((criteria, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                        {criteria}
                      </li>
                    ))}
                    {scheme.eligibility.length > 3 && (
                      <li className="text-primary text-xs">
                        +{scheme.eligibility.length - 3} more criteria
                      </li>
                    )}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    Key Benefits
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {scheme.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required Documents */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    Required Documents
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documents.map((doc, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button asChild className="flex-1">
                    <a href={scheme.applicationLink} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredSchemes.length === 0 && (
        <Card className="agricultural-card text-center py-12">
          <CardContent>
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Schemes Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria to find relevant government schemes.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="agricultural-card mt-8 gradient-field">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold mb-4">Need Help with Applications?</h3>
          <p className="text-muted-foreground mb-6">
            Our support team can help you understand eligibility criteria and guide you through the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Expert
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GovernmentPolicies;