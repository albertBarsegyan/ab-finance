import { CircleCheck, CircleIcon, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/shared/components/ui/alert.tsx';
import { useTimer } from '@/shared/hooks/timer.tsx';

export interface CustomAlertProps {
  variant: 'default' | 'success' | 'destructive';
  message: string;
  duration?: number;
  onTimeout?: VoidFunction;
  onClose?: VoidFunction;
}

export function CustomAlert({
  variant,
  message,
  duration = 5,
  onTimeout,
  onClose,
}: Readonly<CustomAlertProps>) {
  const iconMapper = {
    default: null,
    success: <CircleCheck className="text-success-500" />,
    destructive: <CircleIcon />,
  };

  useTimer(duration, onTimeout);

  return (
    <Alert
      variant={variant}
      className="top-4 absolute flex items-center w-fit left-2 right-2 lg:top-10 lg:right-10 lg:left-auto z-50"
    >
      <AlertDescription className="flex items-center gap-4 pr-4">
        {iconMapper[variant]} {message}
      </AlertDescription>
      <button
        onClick={onClose}
        className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <X className="h-4 w-4 " />
      </button>
    </Alert>
  );
}
