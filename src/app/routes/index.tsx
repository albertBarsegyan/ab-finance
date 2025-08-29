import { RouterProvider } from 'react-router-dom';
import { guestRoutes } from '@/app/routes/guest-routes.tsx';
import { useAuth } from '@/shared/hooks/auth.tsx';
import { authenticatedRoutes } from '@/app/routes/authenticated-routes.tsx';
import { LoaderWrapper } from '@/shared/components/custom/loader';
import { lazy, Suspense } from 'react';

const QuestionsPage = lazy(() =>
  import('@/pages/questions').then(m => ({ default: m.default || m }))
);

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

  if (userAdditional?.isFirstTime)
    return (
      <Suspense
        fallback={
          <LoaderWrapper message="Loading questions..." overlay loading />
        }
      >
        <QuestionsPage />
      </Suspense>
    );

  return (
    <RouterProvider
      router={userAdditional ? authenticatedRoutes : guestRoutes}
    />
  );
}
