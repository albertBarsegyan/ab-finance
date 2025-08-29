import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { LoaderWrapper } from '@/shared/components/custom/loader';
import { appPath } from '@/shared/constants/app-path.ts';

const GuestLayout = lazy(() =>
  import('@/shared/components/layouts/guest-layout.tsx').then(m => ({
    default: m.GuestLayout,
  }))
);
const HomePage = lazy(() =>
  import('@/pages/home').then(m => ({ default: m.HomePage }))
);
const LoginPage = lazy(() =>
  import('@/pages/auth/login.tsx').then(m => ({ default: m.LoginPage }))
);
const RegisterPage = lazy(() =>
  import('@/pages/auth/register.tsx').then(m => ({ default: m.RegisterPage }))
);

export const guestRoutes = createBrowserRouter([
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
        <GuestLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading home..." overlay loading />
            }
          >
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: appPath.LOGIN,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading login..." overlay loading />
            }
          >
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: appPath.REGISTER,
        element: (
          <Suspense
            fallback={
              <LoaderWrapper message="Loading register..." overlay loading />
            }
          >
            <RegisterPage />
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
