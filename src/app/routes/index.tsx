import { RouterProvider } from 'react-router-dom';
import { guestRoutes } from '@/app/routes/guest-routes.tsx';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { authenticatedRoutes } from '@/app/routes/authenticated-routes.tsx';
import { LoaderWrapper } from '@/shared/components/custom/loader';
import QuestionsPage from '@/pages/questions';

export function AppRouter() {
  const { initializing, userAdditional } = useAuth();

  if (initializing)
    return (
      <LoaderWrapper
        message="Loading..."
        overlay
        variant="fullscreen"
        loading
      />
    );

  if (userAdditional?.isFirstTime) return <QuestionsPage />;

  return (
    <RouterProvider
      router={userAdditional ? authenticatedRoutes : guestRoutes}
    />
  );
}
