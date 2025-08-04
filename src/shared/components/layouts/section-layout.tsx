import { cn } from '@/shared/lib/utils.ts';
import type { PropsWithChildren } from 'react';

interface SectionLayoutProps extends PropsWithChildren {
  className?: string;
  wrapperClassName?: string;
}

export function SectionLayout({
  children,
  className,
  wrapperClassName,
}: Readonly<SectionLayoutProps>) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        wrapperClassName
      )}
    >
      <div
        className={cn('w-full max-w-[1440px] px-4 md:px-8 lg:px-6', className)}
      >
        {children}
      </div>
    </div>
  );
}
