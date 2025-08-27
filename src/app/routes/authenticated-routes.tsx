import { createBrowserRouter, Navigate } from 'react-router-dom';
import { appPath } from '@/shared/constants/app-path.ts';
import { MainLayout } from '@/shared/components/layouts/main-layout.tsx';
import { DashboardPage } from '@/pages/dashboard';
import { ProfilePage } from '@/pages/profile';
import { ExpensesPage } from '@/pages/expenses';
import { BudgetsPage } from '@/pages/budgets';
import { GoalsPage } from '@/pages/goals';

export const authenticatedRoutes = createBrowserRouter([
  {
    path: appPath.MAIN_PATH,
    element: <MainLayout />,
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
        path: appPath.EXPENSE,
        element: <ExpensesPage />,
      },
      {
        path: appPath.INCOME,
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
