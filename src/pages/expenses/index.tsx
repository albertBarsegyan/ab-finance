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
import { Plus, TrendingDown } from 'lucide-react';

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
  const { selectedGoalId } = useGoalSelection();

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
      category: 'Expense',
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
          <p className="text-muted-foreground">
            View and manage your financial expenses.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => openModal('add-outcome')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      {/* Transaction Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              $
              {outcomes

                .reduce((sum, outcome) => sum + Number(outcome.amount || 0), 0)
                .toFixed(2)}
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
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
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
                      <div>
                        <h4 className="font-medium">
                          {transaction.description}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          transaction.type === 'income'
                            ? 'default'
                            : 'secondary'
                        }
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
                        {transaction.type === 'income' ? '+' : ''}$
                        {Math.abs(transaction.amount).toFixed(2)}
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
