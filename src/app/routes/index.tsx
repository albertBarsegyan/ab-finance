import { RouterProvider } from 'react-router-dom';
import { guestRoutes } from '@/app/routes/guest-routes.tsx';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { authenticatedRoutes } from '@/app/routes/authenticated-routes.tsx';
import { LoaderWrapper } from '@/shared/components/custom/loader';

export function AppRouter() {
  const { user, initializing } = useAuth();

  if (initializing)
    return (
      <LoaderWrapper
        message="Loading..."
        overlay
        variant="fullscreen"
        loading
      />
    );

  return <RouterProvider router={user ? authenticatedRoutes : guestRoutes} />;
}
