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
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  GraduationCap,
  Heart,
  Home,
  Plane,
  Plus,
  Target,
} from 'lucide-react';
import { useMemo } from 'react';
import { useModal } from '@/shared/hooks/modal';
import { useGoalSelection } from '@/app/providers/goal';

// Helper function to get icon and color based on goal name
const getGoalIconAndColor = (goalName: string) => {
  const nameLower = goalName.toLowerCase();
  if (nameLower.includes('emergency') || nameLower.includes('fund'))
    return { icon: DollarSign, color: 'bg-green-500' };
  if (
    nameLower.includes('house') ||
    nameLower.includes('home') ||
    nameLower.includes('down payment')
  )
    return { icon: Home, color: 'bg-blue-500' };
  if (nameLower.includes('vacation') || nameLower.includes('travel'))
    return { icon: Plane, color: 'bg-purple-500' };
  if (nameLower.includes('car') || nameLower.includes('vehicle'))
    return { icon: Car, color: 'bg-orange-500' };
  if (nameLower.includes('education') || nameLower.includes('school'))
    return { icon: GraduationCap, color: 'bg-indigo-500' };
  if (nameLower.includes('health') || nameLower.includes('medical'))
    return { icon: Heart, color: 'bg-red-500' };
  return { icon: Target, color: 'bg-gray-500' };
};

export function GoalsPage() {
  const { openModal } = useModal();
  const { goals, loading } = useGoalSelection();
  console.log({ goals });
  // Transform goals data for display
  const displayGoals = useMemo(() => {
    return goals.map(goal => {
      const { icon, color } = getGoalIconAndColor(goal.goal);
      const targetAmount = parseFloat(goal.goalPrice) || 0;
      const currentAmount = 0; // TODO: Calculate from incomes/outcomes for this goal
      const progress =
        targetAmount > 0 ? (currentAmount / targetAmount) * 100 : 0;
      const status = progress >= 100 ? 'completed' : 'in-progress';

      return {
        id: goal.id,
        name: goal.goal,
        description: `Target: ${goal.goalCurrency} ${goal.goalPrice}`,
        target: targetAmount,
        current: currentAmount,
        icon,
        color,
        status,
        progress,
        currency: goal.goalCurrency,
      };
    });
  }, [goals]);

  const totalTarget = displayGoals.reduce((sum, goal) => sum + goal.target, 0);
  const totalCurrent = displayGoals.reduce(
    (sum, goal) => sum + goal.current,
    0
  );
  const completedGoals = displayGoals.filter(
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
        <Button onClick={() => openModal('add-goal')}>
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
        {loading ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">Loading goals...</p>
          </div>
        ) : displayGoals.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">
              No goals found. Create your first goal!
            </p>
          </div>
        ) : (
          displayGoals.map(goal => {
            const IconComponent = goal.icon;
            const progress = goal.progress;
            const isCompleted = goal.status === 'completed';

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
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                      <Badge variant={isCompleted ? 'default' : 'secondary'}>
                        {isCompleted ? 'Completed' : 'In Progress'}
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
                      <span className="text-muted-foreground">Currency:</span>
                      <span className="font-medium">{goal.currency}</span>
                    </div>

                    {!isCompleted && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Remaining:
                        </span>
                        <span className="font-medium">
                          ${(goal.target - goal.current).toLocaleString()}
                        </span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Update Progress
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          openModal('edit-goal', { goalId: goal.id });
                        }}
                      >
                        Edit Goal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
