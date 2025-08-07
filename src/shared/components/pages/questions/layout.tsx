import React from 'react';
import { Card } from '@/shared/components/ui/card';

export function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-background">
      <Card className="w-full max-w-md">{children}</Card>
    </div>
  );
}
