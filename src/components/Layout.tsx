import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  Sprout, 
  MessageCircle, 
  Search, 
  Camera, 
  Users, 
  FileText, 
  TrendingUp,
  Home
} from 'lucide-react';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'AI Chat', href: '/chat', icon: MessageCircle },
    { name: 'Crop Advisor', href: '/crops', icon: Sprout },
    { name: 'Disease Detection', href: '/disease', icon: Camera },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Policies', href: '/policies', icon: FileText },
    { name: 'Market Prices', href: '/market', icon: TrendingUp },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-primary" />
              <span className="hidden font-bold sm:inline-block text-xl">
                Smart Farmer
              </span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors hover:text-primary ${
                    isActive(item.href) 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <div className="flex w-full items-center justify-between md:hidden">
              <Link to="/" className="flex items-center space-x-2">
                <Sprout className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl">Smart Farmer</span>
              </Link>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </div>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-1 mt-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground ${
                        isActive(item.href) 
                          ? 'bg-accent text-accent-foreground font-semibold' 
                          : 'text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>

          {/* Desktop Actions */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* Add search or other actions here */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Sprout className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built to empower farmers with AI and technology.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 Smart Farmer Helper. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;