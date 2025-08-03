import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  PiggyBank,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your financial health.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Spending
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,350.00</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,234</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 goals completed this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Your monthly income vs expenses</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Chart component would go here
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Salary Deposit</p>
                  <p className="text-xs text-muted-foreground">
                    Today, 9:00 AM
                  </p>
                </div>
                <div className="text-sm font-medium text-green-600">
                  +$3,500
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Grocery Store</p>
                  <p className="text-xs text-muted-foreground">
                    Yesterday, 2:30 PM
                  </p>
                </div>
                <div className="text-sm font-medium text-red-600">-$85.50</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Gas Station</p>
                  <p className="text-xs text-muted-foreground">
                    Yesterday, 10:15 AM
                  </p>
                </div>
                <div className="text-sm font-medium text-red-600">-$45.00</div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">Freelance Payment</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <div className="text-sm font-medium text-green-600">+$250</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to manage your finances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Add Transaction</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <PiggyBank className="h-6 w-6 mb-2" />
              <span>Set Budget</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Target className="h-6 w-6 mb-2" />
              <span>Create Goal</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <CreditCard className="h-6 w-6 mb-2" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
