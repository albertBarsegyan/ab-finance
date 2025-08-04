import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { BrandIcon } from '@/shared/components/brand';
import { appPath, homeSectionName } from '@/shared/constants/app-path';
import { Menu, X } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const guestNavigation: NavigationItem[] = [
  { name: 'Home', href: appPath.MAIN_PATH },
  { name: 'Features', href: homeSectionName.FEATURES },
  { name: 'Stats', href: homeSectionName.STATS },
  { name: 'About', href: homeSectionName.ABOUT },
  { name: 'Testimonials', href: homeSectionName.TESTIMONIALS },
];

export function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href={appPath.MAIN_PATH} className="flex items-center">
              <BrandIcon />
            </a>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-2 space-y-1 bg-white border-t border-gray-200">
          {guestNavigation.map(item => {
            const isActive = location.hash === item.href;

            return (
              <a
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-green-100 text-green-900'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                {item.name}
              </a>
            );
          })}

          <div className="border-t border-gray-200 my-2" />
          <div className="px-3 py-2 space-y-2">
            <a href={appPath.LOGIN}>
              <Button variant="ghost" size="sm" className="w-full text-center">
                Sign In
              </Button>
            </a>

            <a href={appPath.REGISTER}>
              <Button size="sm" className="w-full">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
