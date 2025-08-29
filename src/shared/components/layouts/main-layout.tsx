import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button.tsx';
import {
  CreditCard,
  Home,
  Image,
  LogOut,
  Menu,
  PiggyBank,
  Target,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { useAlert } from '@/shared/hooks/alert.tsx';
import { useBackgroundImage } from '@/shared/hooks/background-image.tsx';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { appPath } from '@/shared/constants/app-path.ts';
import { AbFinanceLogo } from '@/shared/components/icons/logo.tsx';
import { UserGoalsDropdown } from '@/shared/components/custom/user-goals-dropdown.tsx';
import { BackgroundImageModal } from '@/shared/components/custom/background-image-modal.tsx';

const navigation = [
  { name: 'Overview', href: appPath.MAIN_PATH, icon: Home },
  { name: 'Income', href: appPath.INCOME, icon: PiggyBank },
  { name: 'Expense', href: appPath.EXPENSE, icon: CreditCard },
  { name: 'Goals', href: appPath.GOALS, icon: Target },
  { name: 'Profile', href: appPath.PROFILE, icon: User },
];

export function MainLayout() {
  const { signOut } = useAuth();
  const { setAlert } = useAlert();
  const { backgroundImage, updateBackgroundImage } = useBackgroundImage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [backgroundModalOpen, setBackgroundModalOpen] = useState(false);
  const location = useLocation();

  const handleSignOut = async () => {
    setLogoutDialogOpen(false);
    const alertData = await signOut?.();
    if (alertData) setAlert(alertData);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 relative"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={appPath.MAIN_PATH} className="flex items-center">
                <AbFinanceLogo />
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <UserGoalsDropdown />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setBackgroundModalOpen(true)}
                className="p-2"
                title="Customize Background"
              >
                <Image className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="p-2"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
      >
        <div
          className="fixed inset-0 bg-gray-600/50"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-full lg:w-64 flex-col bg-white/95 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">
              <AbFinanceLogo />
            </h1>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="px-4 pb-4">
            <UserGoalsDropdown />
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-4 space-y-2">
            <Button
              onClick={() => setBackgroundModalOpen(true)}
              variant="outline"
              className="w-full justify-start"
            >
              <Image className="mr-3 h-5 w-5" />
              Customize Background
            </Button>
            <Button
              onClick={() => setLogoutDialogOpen(true)}
              variant="outline"
              className="w-full justify-start"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col z-10">
        <div className="flex flex-col flex-grow bg-white/95 backdrop-blur-sm border-r border-gray-200">
          <div className="flex items-center h-16 px-4">
            <Link to={appPath.MAIN_PATH} className="flex items-center">
              <AbFinanceLogo />
            </Link>
          </div>
          <div className="px-4 pb-4">
            <UserGoalsDropdown />
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-green-100 text-green-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-gray-200 p-4 space-y-2">
            <Button
              onClick={() => setBackgroundModalOpen(true)}
              variant="outline"
              className="w-full justify-start"
            >
              <Image className="mr-3 h-5 w-5" />
              Customize Background
            </Button>
            <Button
              onClick={() => setLogoutDialogOpen(true)}
              variant="outline"
              className="w-full justify-start"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:pl-64 relative">
        <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to log out?</p>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setLogoutDialogOpen(false)}
              >
                No
              </Button>
              <Button variant="destructive" onClick={handleSignOut}>
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <BackgroundImageModal
          open={backgroundModalOpen}
          onOpenChange={setBackgroundModalOpen}
          currentBackgroundImage={backgroundImage || undefined}
          onBackgroundImageChange={updateBackgroundImage}
        />

        <main className="py-6">
          <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
