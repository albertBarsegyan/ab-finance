import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { useMemo } from 'react';
import { useModal } from '@/shared/hooks/modal';
import { useAuth } from '@/shared/hooks/auth';
import { useIncomes } from '@/entities/incomes/model/use-incomes';
import { useGoalSelection } from '@/app/providers/goal';
import { formatCurrencyWithDecimals } from '@/shared/lib/currency';
import { exportIncomesToCSV } from '@/shared/lib/csv-export';
import {
  Car,
  DollarSign,
  Download,
  Heart,
  Home,
  Plane,
  Plus,
} from 'lucide-react';

// Helper function to get icon and color based on income category
const getIncomeIconAndColor = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('salary') || categoryLower.includes('job'))
    return { icon: DollarSign, color: 'bg-green-500' };
  if (categoryLower.includes('freelance') || categoryLower.includes('project'))
    return { icon: Car, color: 'bg-blue-500' };
  if (
    categoryLower.includes('investment') ||
    categoryLower.includes('dividend')
  )
    return { icon: Home, color: 'bg-purple-500' };
  if (categoryLower.includes('rental') || categoryLower.includes('property'))
    return { icon: Heart, color: 'bg-orange-500' };
  if (categoryLower.includes('business') || categoryLower.includes('side'))
    return { icon: Plane, color: 'bg-indigo-500' };
  return { icon: DollarSign, color: 'bg-gray-500' };
};

export function IncomePage() {
  const { openModal } = useModal();
  const { user } = useAuth();
  const { selectedGoalId, selectedGoal } = useGoalSelection();
  const { incomes, loading } = useIncomes(
    user?.uid,
    selectedGoalId || undefined
  );

  // Transform incomes data for display
  const displayIncomes = useMemo(() => {
    return incomes.map(income => {
      const { icon, color } = getIncomeIconAndColor(
        (income.note as string) || 'Income'
      );
      const amount = (income.amount as number) || 0;

      return {
        id: income.id,
        name: (income.note as string) || 'Income',
        icon,
        amount,
        color,
        status: 'received',
        date: income.createdAt
          ? new Date(income.createdAt as string).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
      };
    });
  }, [incomes]);

  const totalIncome = displayIncomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  // Get currency from selected goal, default to USD
  const currencyCode = selectedGoal?.goalCurrency || 'USD';

  const handleExportIncomes = () => {
    exportIncomesToCSV(incomes, selectedGoal, currencyCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Income
          </h1>

          <p className="text-muted-foreground">
            Track your Income and stay within your budget limits.
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={handleExportIncomes}
            variant="outline"
            className="w-full sm:w-auto"
            disabled={incomes.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => openModal('add-income')}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Income
          </Button>
        </div>
      </div>

      {/* Budget Overview */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold sm:text-2xl">
              {formatCurrencyWithDecimals(totalIncome, currencyCode)}
            </div>
            <p className="text-xs text-muted-foreground">Total Income</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Budget Progress</CardTitle>
          <CardDescription>
            Your spending progress across all categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Loading income data...</p>
              </div>
            ) : displayIncomes.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No income data found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayIncomes.map(income => {
                  const IconComponent = income.icon;
                  return (
                    <div
                      key={income.id}
                      className="flex flex-col space-y-3 p-3 border rounded-lg sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${income.color}`}
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{income.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {income.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">
                          {formatCurrencyWithDecimals(
                            income.amount,
                            currencyCode
                          )}
                        </p>
                        <Badge variant="default" className="text-xs">
                          {income.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
