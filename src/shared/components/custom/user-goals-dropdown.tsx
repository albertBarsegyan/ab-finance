import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Badge } from '@/shared/components/ui/badge';
import { ChevronDown, Plus, Target, Check } from 'lucide-react';
import { useGoals } from '@/entities/goals/model/use-goals';
import { useAuth } from '@/shared/hooks/auth';
import { useModal } from '@/shared/hooks/modal';
import { useGoalSelection } from '@/app/providers/goal';
import { appPath } from '@/shared/constants/app-path';
import { Link } from 'react-router-dom';

export function UserGoalsDropdown() {
  const { user } = useAuth();
  const { goals, loading } = useGoals(user?.uid);
  const { openModal } = useModal();
  const { selectedGoal, setSelectedGoal } = useGoalSelection();
  const [open, setOpen] = useState(false);

  const formatCurrency = (amount: string, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
    }).format(parseFloat(amount) || 0);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start flex space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <Target className="h-4 w-4" />
          <span>{selectedGoal ? selectedGoal.goal : 'Select Goal'}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Your Financial Goals</span>
          <Badge variant="secondary" className="text-xs">
            {goals.length}
          </Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {loading ? (
          <div className="p-4 text-center text-sm text-gray-500">
            Loading goals...
          </div>
        ) : goals.length === 0 ? (
          <div className="p-4 text-center text-sm text-gray-500">
            No goals set yet
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto">
            {goals.slice(0, 5).map(goal => (
              <DropdownMenuItem
                key={goal.id}
                className="flex flex-col items-start p-3"
                onClick={() => {
                  setSelectedGoal(goal);
                  setOpen(false);
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm truncate max-w-48">
                      {goal.goal}
                    </span>
                    {selectedGoal?.id === goal.id && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Step {goal.step}
                  </Badge>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs text-gray-500">
                    {formatCurrency(goal.goalPrice, goal.goalCurrency)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {goal.goalCurrency}
                  </span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setOpen(false);
            openModal('add-goal');
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Goal
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            to={appPath.GOALS}
            className="flex items-center justify-center w-full"
            onClick={() => setOpen(false)}
          >
            <Target className="mr-2 h-4 w-4" />
            Manage Goals
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
