import { RouterProvider } from 'react-router-dom';
import { guestRoutes } from '@/app/routes/guest-routes.tsx';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { authenticatedRoutes } from '@/app/routes/authenticated-routes.tsx';

export function AppRouter() {
  const { user } = useAuth();

  return <RouterProvider router={user ? authenticatedRoutes : guestRoutes} />;
}
