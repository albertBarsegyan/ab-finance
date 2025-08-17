'use client';

import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils.ts';

interface LoaderWrapperProps {
  variant?: 'fullscreen' | 'inline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  message?: string;
  overlay?: boolean;
  loading: boolean;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function LoaderWrapper({
  variant = 'inline',
  size = 'md',
  className,
  message,
  overlay = true,
  loading,
}: LoaderWrapperProps) {
  if (!loading) return null;

  const iconSize = sizeMap[size];

  if (variant === 'fullscreen') {
    return (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          overlay && 'bg-background/80 backdrop-blur-sm',
          className
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={iconSize} />
          {message && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-3 p-4', className)}
    >
      <Loader2 className="animate-spin text-primary" size={iconSize} />
      {message && (
        <span className="text-sm text-muted-foreground">{message}</span>
      )}
    </div>
  );
}
