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
  Target,
  CheckCircle,
  Clock,
  DollarSign,
  Home,
  Car,
  Plane,
  GraduationCap,
  Heart,
} from 'lucide-react';

const goals = [
  {
    id: 1,
    name: 'Emergency Fund',
    description: 'Save 6 months of living expenses',
    target: 15000,
    current: 12000,
    icon: DollarSign,
    color: 'bg-green-500',
    status: 'in-progress',
    deadline: '2024-06-30',
  },
  {
    id: 2,
    name: 'Down Payment',
    description: 'Save for house down payment',
    target: 50000,
    current: 25000,
    icon: Home,
    color: 'bg-blue-500',
    status: 'in-progress',
    deadline: '2025-12-31',
  },
  {
    id: 3,
    name: 'Vacation Fund',
    description: 'Save for dream vacation',
    target: 5000,
    current: 5000,
    icon: Plane,
    color: 'bg-purple-500',
    status: 'completed',
    deadline: '2024-03-15',
  },
  {
    id: 4,
    name: 'New Car',
    description: 'Save for a new car',
    target: 25000,
    current: 5000,
    icon: Car,
    color: 'bg-orange-500',
    status: 'in-progress',
    deadline: '2025-06-30',
  },
  {
    id: 5,
    name: 'Education Fund',
    description: "Save for children's education",
    target: 100000,
    current: 15000,
    icon: GraduationCap,
    color: 'bg-indigo-500',
    status: 'in-progress',
    deadline: '2030-12-31',
  },
  {
    id: 6,
    name: 'Healthcare Fund',
    description: 'Save for medical expenses',
    target: 10000,
    current: 8000,
    icon: Heart,
    color: 'bg-red-500',
    status: 'in-progress',
    deadline: '2024-12-31',
  },
];

export function GoalsPage() {
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = goals.reduce((sum, goal) => sum + goal.current, 0);
  const completedGoals = goals.filter(
    goal => goal.status === 'completed'
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Goals</h1>
          <p className="text-muted-foreground">
            Set and track your financial goals to achieve your dreams.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Goal
        </Button>
      </div>

      {/* Goals Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalTarget.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalCurrent.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((totalCurrent / totalTarget) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Overall progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedGoals}</div>
            <p className="text-xs text-muted-foreground">Goals achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid gap-4 md:grid-cols-2">
        {goals.map(goal => {
          const IconComponent = goal.icon;
          const progress = (goal.current / goal.target) * 100;
          const isCompleted = goal.status === 'completed';
          const isOverdue =
            new Date(goal.deadline) < new Date() && !isCompleted;

          return (
            <Card
              key={goal.id}
              className={isCompleted ? 'border-green-200 bg-green-50' : ''}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${goal.color}`}
                    >
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : isOverdue ? (
                      <Clock className="h-4 w-4 text-red-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-yellow-500" />
                    )}
                    <Badge
                      variant={
                        isCompleted
                          ? 'default'
                          : isOverdue
                            ? 'destructive'
                            : 'secondary'
                      }
                    >
                      {isCompleted
                        ? 'Completed'
                        : isOverdue
                          ? 'Overdue'
                          : 'In Progress'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {progress.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>${goal.current.toLocaleString()} saved</span>
                      <span>${goal.target.toLocaleString()} target</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Deadline:</span>
                    <span
                      className={isOverdue ? 'text-red-600 font-medium' : ''}
                    >
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  {!isCompleted && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Remaining:</span>
                      <span className="font-medium">
                        ${(goal.target - goal.current).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Update Progress
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit Goal
                    </Button>
                  </div>
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
          <CardDescription>
            Manage your financial goals efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Plus className="h-6 w-6 mb-2" />
              <span>Create New Goal</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Target className="h-6 w-6 mb-2" />
              <span>Goal Templates</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Update Progress</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
