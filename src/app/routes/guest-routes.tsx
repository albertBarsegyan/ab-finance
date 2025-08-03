import { createBrowserRouter } from 'react-router-dom';
import { GuestLayout } from '@/shared/components/layouts/guest-layout.tsx';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/auth/login.tsx';
import { RegisterPage } from '@/pages/auth/register.tsx';
import { NotFoundPage } from '@/pages/not-found.tsx';
import { appPath } from '@/shared/constants/app-path.ts';

export const guestRoutes = createBrowserRouter([
  {
    path: appPath.MAIN_PATH,
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: appPath.LOGIN,
        element: <LoginPage />,
      },
      {
        path: appPath.REGISTER,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: appPath.ALL,
    element: <NotFoundPage />,
  },
]);
