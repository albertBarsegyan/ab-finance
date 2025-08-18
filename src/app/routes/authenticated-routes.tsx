import { createBrowserRouter, Navigate } from 'react-router-dom';
import { appPath } from '@/shared/constants/app-path.ts';
import { AuthenticatedLayout } from '@/shared/components/layouts/authenticated-layout.tsx';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { TransactionsPage } from '@/pages/transactions';
import { BudgetsPage } from '@/pages/budgets';
import { GoalsPage } from '@/pages/goals';

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
    path: appPath.ALL,
    element: <Navigate to={appPath.MAIN_PATH} />,
  },
]);
