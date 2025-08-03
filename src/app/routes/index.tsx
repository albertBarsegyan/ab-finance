import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthenticatedLayout } from '@/shared/components/layouts/authenticated-layout';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { TransactionsPage } from '@/pages/transactions';
import { BudgetsPage } from '@/pages/budgets';
import { GoalsPage } from '@/pages/goals';
import { NotFoundPage } from '@/pages/not-found';
import { guestRoutes } from '@/app/routes/guest-routes.tsx';
import { appPath } from '@/shared/constants/app-path.ts';

export const authenticatedRoutes = createBrowserRouter([
  {
    path: appPath.MAIN_PATH,
    element: <AuthenticatedLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: appPath.PROFILE,
        element: <ProfilePage />,
      },
      {
        path: appPath.TRANSACTION,
        element: <TransactionsPage />,
      },
      {
        path: appPath.BUDGET,
        element: <BudgetsPage />,
      },
      {
        path: appPath.GOALS,
        element: <GoalsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  const user = false;

  return <RouterProvider router={user ? authenticatedRoutes : guestRoutes} />;
}
