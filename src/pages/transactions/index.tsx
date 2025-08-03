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
import {
  Search,
  Filter,
  Plus,
  Download,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ShoppingBag,
  Car,
  Home,
  Utensils,
} from 'lucide-react';

const transactions = [
  {
    id: 1,
    description: 'Grocery Store',
    amount: -85.5,
    category: 'Food & Dining',
    date: '2024-01-15',
    type: 'expense',
    icon: ShoppingBag,
  },
  {
    id: 2,
    description: 'Salary Deposit',
    amount: 3500.0,
    category: 'Income',
    date: '2024-01-14',
    type: 'income',
    icon: TrendingUp,
  },
  {
    id: 3,
    description: 'Gas Station',
    amount: -45.0,
    category: 'Transportation',
    date: '2024-01-13',
    type: 'expense',
    icon: Car,
  },
  {
    id: 4,
    description: 'Freelance Payment',
    amount: 250.0,
    category: 'Income',
    date: '2024-01-12',
    type: 'income',
    icon: TrendingUp,
  },
  {
    id: 5,
    description: 'Restaurant',
    amount: -65.0,
    category: 'Food & Dining',
    date: '2024-01-11',
    type: 'expense',
    icon: Utensils,
  },
  {
    id: 6,
    description: 'Rent Payment',
    amount: -1200.0,
    category: 'Housing',
    date: '2024-01-10',
    type: 'expense',
    icon: Home,
  },
];

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

export function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">
            View and manage your financial transactions.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
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
            <div className="text-2xl font-bold text-green-600">$3,750.00</div>
            <p className="text-xs text-muted-foreground">This month</p>
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
            <div className="text-2xl font-bold text-red-600">$1,395.50</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$2,354.50</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map(transaction => {
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
                      <h4 className="font-medium">{transaction.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        transaction.type === 'income' ? 'default' : 'secondary'
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
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
