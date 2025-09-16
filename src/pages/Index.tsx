import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Sprout, 
  Camera, 
  Users, 
  FileText, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import heroImage from '@/assets/hero-farming.jpg';

const Index = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chat Assistant',
      description: 'Get instant answers to your farming questions from our intelligent AI assistant.',
      href: '/chat',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Sprout,
      title: 'Crop Recommendations',
      description: 'Receive personalized crop suggestions based on your soil, climate, and resources.',
      href: '/crops',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Camera,
      title: 'Disease Detection',
      description: 'Upload plant photos to identify diseases and get treatment recommendations.',
      href: '/disease',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Users,
      title: 'Community Hub',
      description: 'Connect with nearby farmers, share equipment, and build farming networks.',
      href: '/community',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: FileText,
      title: 'Government Policies',
      description: 'Access relevant schemes, subsidies, and credit lines for farmers.',
      href: '/policies',
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50'
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Stay updated with current market rates and export opportunities.',
      href: '/market',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Increase Productivity',
      description: 'AI-powered insights to maximize your farm yield and efficiency.'
    },
    {
      icon: Shield,
      title: 'Reduce Risks',
      description: 'Early disease detection and weather-based recommendations.'
    },
    {
      icon: Globe,
      title: 'Market Access',
      description: 'Connect directly with buyers and access global markets.'
    }
  ];

  const stats = [
    { label: 'Active Farmers', value: '10,000+' },
    { label: 'Crops Analyzed', value: '500+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Countries', value: '25+' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="container relative mx-auto px-4 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="w-fit gradient-primary text-primary-foreground">
                  AI-Powered Agriculture
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  Smart Farming
                  <span className="block text-primary">Made Simple</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Empower your farming journey with AI-driven insights, community support, 
                  and modern agricultural tools designed for today's smart farmers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="shadow-button">
                  <Link to="/chat">
                    Start Farming Chat
                    <MessageCircle className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/crops">
                    Get Crop Advice
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl transform rotate-3" />
              <img
                src={heroImage}
                alt="Modern farming with technology"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need 
              to make informed farming decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="agricultural-card group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Link to={feature.href}>
                        Explore
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Choose Smart Farmer Helper?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transform your farming operations with cutting-edge technology and proven methodologies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center gradient-field rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already using AI to make smarter decisions, 
              increase yields, and build sustainable farming practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shadow-button">
                <Link to="/chat">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/crops">
                  Try Crop Recommendations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trusted by Farmers Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Smart Farmer Helper increased my crop yield by 40% in just one season. The AI recommendations are incredibly accurate.",
                author: "Rajesh Kumar",
                role: "Rice Farmer, Punjab"
              },
              {
                quote: "The disease detection feature saved my tomato crop. Early detection meant I could treat the problem before it spread.",
                author: "Maria Santos",
                role: "Organic Farmer, Maharashtra"
              },
              {
                quote: "Connecting with other farmers through the platform helped me access better equipment and share knowledge.",
                author: "David Chen",
                role: "Wheat Farmer, Haryana"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="agricultural-card">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <CheckCircle key={i} className="h-4 w-4" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;