import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Badge } from '@/shared/components/ui/badge';
import { useMemo } from 'react';
import { useModal } from '@/shared/hooks/modal';
import { useAuth } from '@/shared/hooks/auth';
import { useIncomes } from '@/entities/incomes/model/use-incomes';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes';
import {
  CreditCard,
  Filter,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

// Type for transaction display
type TransactionDisplay = {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: 'income' | 'expense';
  icon: any;
};

const categories = [
  'All Categories',
  'Food & Dining',
  'Transportation',
  'Housing',
  'Income',
  'Entertainment',
  'Healthcare',
  'Shopping',
];

export function ExpensesPage() {
  const { openModal } = useModal();
  const { user } = useAuth();
  const { incomes, loading: incomesLoading } = useIncomes(user?.uid);
  const { outcomes, loading: outcomesLoading } = useOutcomes(user?.uid);

  // Combine incomes and outcomes into transactions
  const transactions = useMemo((): TransactionDisplay[] => {
    const incomeTransactions: TransactionDisplay[] = incomes.map(income => ({
      id: income.id,
      description: (income.note as string) || 'Income',
      amount: (income.amount as number) || 0,
      category: 'Income',
      date: income.createdAt
        ? new Date(income.createdAt as number).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      type: 'income',
      icon: TrendingUp,
    }));

    const outcomeTransactions: TransactionDisplay[] = outcomes.map(outcome => ({
      id: outcome.id,
      description: (outcome.note as string) || 'Expense',
      amount: -((outcome.amount as number) || 0), // Negative for expenses
      category: 'Expense',
      date: outcome.createdAt
        ? new Date(outcome.createdAt as number).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0],
      type: 'expense',
      icon: TrendingDown,
    }));

    return [...incomeTransactions, ...outcomeTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [incomes, outcomes]);

  const loading = incomesLoading || outcomesLoading;

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

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              $
              {incomes
                .reduce(
                  (sum, income) => sum + ((income.amount as number) || 0),
                  0
                )
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>

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
                .reduce(
                  (sum, outcome) => sum + ((outcome.amount as number) || 0),
                  0
                )
                .toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              $
              {(
                incomes.reduce(
                  (sum, income) => sum + ((income.amount as number) || 0),
                  0
                ) -
                outcomes.reduce(
                  (sum, outcome) => sum + ((outcome.amount as number) || 0),
                  0
                )
              ).toFixed(2)}
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
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading transactions...</p>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            ) : (
              transactions.map((transaction: TransactionDisplay) => {
                const IconComponent = transaction.icon;
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
