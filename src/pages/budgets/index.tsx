import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import { Badge } from '@/shared/components/ui/badge';
import {
  Plus,
  Settings,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ShoppingBag,
  Car,
  Home,
  Utensils,
  Heart,
  Plane,
} from 'lucide-react';

const budgets = [
  {
    id: 1,
    name: 'Food & Dining',
    icon: Utensils,
    budget: 500,
    spent: 385.5,
    color: 'bg-blue-500',
    status: 'on-track',
  },
  {
    id: 2,
    name: 'Transportation',
    icon: Car,
    budget: 300,
    spent: 245.0,
    color: 'bg-green-500',
    status: 'on-track',
  },
  {
    id: 3,
    name: 'Housing',
    icon: Home,
    budget: 1200,
    spent: 1200.0,
    color: 'bg-yellow-500',
    status: 'warning',
  },
  {
    id: 4,
    name: 'Shopping',
    icon: ShoppingBag,
    budget: 200,
    spent: 185.0,
    color: 'bg-purple-500',
    status: 'on-track',
  },
  {
    id: 5,
    name: 'Healthcare',
    icon: Heart,
    budget: 150,
    spent: 75.0,
    color: 'bg-red-500',
    status: 'on-track',
  },
  {
    id: 6,
    name: 'Travel',
    icon: Plane,
    budget: 1000,
    spent: 0.0,
    color: 'bg-indigo-500',
    status: 'on-track',
  },
];

export function BudgetsPage() {
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Track your spending and stay within your budget limits.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Budget
        </Button>
      </div>

      {/* Budget Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBudget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${remainingBudget.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
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
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Monthly Progress</span>
              <span className="text-sm text-muted-foreground">
                {((totalSpent / totalBudget) * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={(totalSpent / totalBudget) * 100}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${totalSpent.toFixed(2)} spent</span>
              <span>${totalBudget.toFixed(2)} budget</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map(budget => {
          const IconComponent = budget.icon;
          const progress = (budget.spent / budget.budget) * 100;
          const isOverBudget = progress > 100;
          const isWarning = progress > 80 && progress <= 100;

          return (
            <Card key={budget.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${budget.color}`}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.name}</CardTitle>
                      <CardDescription>
                        ${budget.spent.toFixed(2)} of $
                        {budget.budget.toFixed(2)}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isOverBudget ? (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    ) : isWarning ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                    <Badge
                      variant={
                        isOverBudget
                          ? 'destructive'
                          : isWarning
                            ? 'secondary'
                            : 'default'
                      }
                    >
                      {isOverBudget
                        ? 'Over Budget'
                        : isWarning
                          ? 'Warning'
                          : 'On Track'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.min(progress, 100)}
                    className={`w-full ${isOverBudget ? 'bg-red-100' : ''}`}
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>${budget.spent.toFixed(2)} spent</span>
                    <span>${budget.budget.toFixed(2)} budget</span>
                  </div>
                  {budget.budget - budget.spent > 0 && (
                    <p className="text-xs text-green-600">
                      ${(budget.budget - budget.spent).toFixed(2)} remaining
                    </p>
                  )}
                  {isOverBudget && (
                    <p className="text-xs text-red-600">
                      ${(budget.spent - budget.budget).toFixed(2)} over budget
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your budgets efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Create New Budget</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span>Budget Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Adjust Budgets</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
