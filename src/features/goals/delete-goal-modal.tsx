import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { useGoalSelection } from '@/app/providers/goal/index.tsx';
import { useAlert } from '@/shared/hooks/alert.tsx';

interface DeleteGoalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalId: string;
}

export function DeleteGoalModal({
  open,
  onOpenChange,
  goalId,
}: DeleteGoalModalProps) {
  const { deleteGoal } = useGoalSelection();
  const { setAlert } = useAlert();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteGoal = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    try {
      const result = await deleteGoal(goalId);

      if (result.success) {
        setAlert({
          variant: 'success',
          message: 'Goal deleted successfully',
        });
        onOpenChange(false);
      } else {
        setAlert({
          variant: 'destructive',
          message: result.error || 'Failed to delete goal',
        });
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      setAlert({
        variant: 'destructive',
        message: 'An unexpected error occurred',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    if (!isDeleting) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Goal Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this goal? This action cannot be
          undone.
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteGoal}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Goal'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
