import React from 'react';
import { Card } from '@/shared/components/ui/card.tsx';

export function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center min-h-[100vh] bg-background overflow-yauto">
      <Card className="w-full max-w-md my-6 mx-3">{children}</Card>
    </div>
  );
}
