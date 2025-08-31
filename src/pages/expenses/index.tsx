import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { type JSX, useMemo } from 'react';
import { useModal } from '@/shared/hooks/modal';
import { useAuth } from '@/shared/hooks/auth';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes';
import { useGoalSelection } from '@/app/providers/goal';
import { formatCurrencyWithDecimals } from '@/shared/lib/currency';
import { exportOutcomesToCSV } from '@/shared/lib/csv-export';
import { Download, Plus, TrendingDown } from 'lucide-react';

// Type for transaction display
type TransactionDisplay = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  icon: unknown;
};

export function ExpensesPage() {
  const { openModal } = useModal();
  const { user } = useAuth();
  const { selectedGoalId, selectedGoal } = useGoalSelection();

  const { outcomes, loading: outcomesLoading } = useOutcomes(
    user?.uid,
    selectedGoalId || undefined
  );

  // Combine incomes and outcomes into transactions
  const transactions = useMemo((): TransactionDisplay[] => {
    const outcomeTransactions: TransactionDisplay[] = outcomes.map(outcome => ({
      id: outcome.id,
      description: (outcome.note as string) || 'Expense',
      amount: -Number(outcome.amount || 0), // Negative for expenses
      category: outcome.outcomeType || '🔧 Other',
      date: outcome.createdAt
        ? new Date(outcome.createdAt as number).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      type: 'expense',
      icon: TrendingDown,
    }));

    return [...outcomeTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [outcomes]);

  // Get currency from selected goal, default to USD
  const currencyCode = selectedGoal?.goalCurrency || 'USD';

  const handleExportExpenses = () => {
    exportOutcomesToCSV(outcomes, selectedGoal, currencyCode);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Expenses
          </h1>

          {selectedGoal && (
            <p className="text-muted-foreground">Goal: {selectedGoal?.goal}</p>
          )}
          <p className="text-muted-foreground">
            View and manage your financial expenses.
          </p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Button
            onClick={handleExportExpenses}
            variant="outline"
            className="w-full sm:w-auto"
            disabled={outcomes.length === 0}
          >
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button
            onClick={() => openModal('add-outcome')}
            className="w-full sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600 sm:text-2xl">
              {formatCurrencyWithDecimals(
                outcomes.reduce(
                  (sum, outcome) => sum + Number(outcome.amount || 0),
                  0
                ),
                currencyCode
              )}
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
          <CardDescription>Your latest expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outcomesLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            ) : (
              transactions.map((transaction: TransactionDisplay) => {
                const IconComponent = transaction.icon as ({
                  className,
                }: {
                  className: string;
                }) => JSX.Element;

                return (
                  <div
                    key={transaction.id}
                    className="flex flex-col space-y-3 p-4 border rounded-lg hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income'
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        <IconComponent
                          className={`h-5 w-5 ${
                            transaction.type === 'income'
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium truncate">
                          {transaction.description}
                        </h4>
                        <p className="text-sm text-muted-foreground truncate">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                      <Badge
                        variant={
                          transaction.type === 'income'
                            ? 'default'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {transaction.type === 'income' ? 'Income' : 'Expense'}
                      </Badge>
                      <span
                        className={`font-medium ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : ''}
                        {formatCurrencyWithDecimals(
                          Math.abs(transaction.amount),
                          currencyCode
                        )}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
