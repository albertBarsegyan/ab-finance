import { createBrowserRouter, Navigate } from 'react-router-dom';
import { appPath } from '@/shared/constants/app-path.ts';
import { lazy, Suspense } from 'react';
import { LoaderWrapper } from '@/shared/components/custom/loader';

const MainLayout = lazy(() =>
  import('@/shared/components/layouts/main-layout.tsx').then(m => ({
    default: m.MainLayout,
  }))
);
const DashboardPage = lazy(() =>
  import('@/pages/dashboard').then(m => ({ default: m.DashboardPage }))
);
const ProfilePage = lazy(() =>
  import('@/pages/profile').then(m => ({ default: m.ProfilePage }))
);
const ExpensesPage = lazy(() =>
  import('@/pages/expenses').then(m => ({ default: m.ExpensesPage }))
);
const IncomePage = lazy(() =>
  import('@/pages/income').then(m => ({ default: m.IncomePage }))
);
const GoalsPage = lazy(() =>
  import('@/pages/goals').then(m => ({ default: m.GoalsPage }))
);

export const authenticatedRoutes = createBrowserRouter([
  {
    path: appPath.MAIN_PATH,
    element: (
      <Suspense
        fallback={
          <LoaderWrapper
            message="Loading..."
            overlay
            variant="fullscreen"
            loading
          />
        }
      >
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading dashboard..." overlay loading />
            }
          >
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: appPath.PROFILE,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading profile..." overlay loading />
            }
          >
            <ProfilePage />
          </Suspense>
        ),
      },
      {
        path: appPath.EXPENSE,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading expenses..." overlay loading />
            }
          >
            <ExpensesPage />
          </Suspense>
        ),
      },
      {
        path: appPath.INCOME,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading income..." overlay loading />
            }
          >
            <IncomePage />
          </Suspense>
        ),
      },
      {
        path: appPath.GOALS,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading goals..." overlay loading />
            }
          >
            <GoalsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: appPath.ALL,
    element: <Navigate to={appPath.MAIN_PATH} />,
  },
]);
