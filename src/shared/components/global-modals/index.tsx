import { AddIncomeModal } from '@/features/incomes/add-income-modal.tsx';
import { AddOutcomeModal } from '@/features/outcomes/add-outcome-modal.tsx';
import { AddGoalModal } from '@/features/goals/add-goal-modal.tsx';
import { useModal } from '@/shared/hooks/modal';

export function GlobalModals() {
  const { isOpen, modalId, closeModal } = useModal();

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

      default:
        return null;
    }
  };

  return renderModal();
}
