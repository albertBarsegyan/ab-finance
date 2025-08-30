import { AddIncomeModal } from '@/features/incomes/add-income-modal.tsx';
import { AddOutcomeModal } from '@/features/outcomes/add-outcome-modal.tsx';
import { AddGoalModal } from '@/features/goals/add-goal-modal.tsx';
import { EditGoalModal } from '@/features/goals/edit-goal-modal.tsx';
import { useModal } from '@/shared/hooks/modal';
import { DeleteGoalModal } from '@/features/goals/delete-goal-modal.tsx';

export function GlobalModals() {
  const { isOpen, modalId, closeModal, payload } = useModal();

  const typedPayload = payload as { goalId: string };

  const renderModal = () => {
    switch (modalId) {
      case 'add-income':
        return (
          <AddIncomeModal
            open={isOpen}
            onOpenChange={open => {
              if (!open) closeModal();
            }}
          />
        );

      case 'add-outcome':
        return (
          <AddOutcomeModal
            open={isOpen}
            onOpenChange={open => {
              if (!open) closeModal();
            }}
          />
        );

      case 'add-goal':
        return (
          <AddGoalModal
            open={isOpen}
            onOpenChange={open => {
              if (!open) closeModal();
            }}
          />
        );

      case 'edit-goal':
        return (
          <EditGoalModal
            open={isOpen}
            onOpenChange={open => {
              if (!open) closeModal();
            }}
            goalId={typedPayload?.goalId}
          />
        );

      case 'delete-goal':
        return (
          <DeleteGoalModal
            open={isOpen}
            onOpenChange={open => {
              if (!open) closeModal();
            }}
            goalId={typedPayload?.goalId}
          />
        );

      default:
        return null;
    }
  };

  return renderModal();
}
