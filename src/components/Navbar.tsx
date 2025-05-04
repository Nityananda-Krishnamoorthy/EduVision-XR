
import React from 'react';
import { BrainCircuit, Cog, Home, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', href: '/', icon: <Home className="h-4 w-4 mr-2" /> },
    { name: 'Models', href: '/models', icon: <BrainCircuit className="h-4 w-4 mr-2" /> },
    { name: 'Settings', href: '/settings', icon: <Cog className="h-4 w-4 mr-2" /> },
  ];

  return (
    <nav className="bg-ar-black text-foreground shadow-md border-b border-ar-purple/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-ar-purple flex items-center justify-center">
                  <BrainCircuit className="h-5 w-5 text-ar-black" />
                </div>
                <span className="text-lg font-bold text-ar-purple">SheR</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    className="text-foreground hover:bg-ar-purple/20"
                    onClick={() => navigate(link.href)}
                  >
                    {link.icon}
                    {link.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden bg-ar-black border-t border-ar-purple/20",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <Button
              key={link.name}
              variant="ghost"
              className="w-full justify-start text-foreground hover:bg-ar-purple/20"
              onClick={() => {
                navigate(link.href);
                setIsMenuOpen(false);
              }}
            >
              {link.icon}
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
