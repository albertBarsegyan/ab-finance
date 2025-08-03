import { Wallet } from 'lucide-react';

export function BrandIcon() {
  return (
    <div className="flex items-center gap-2">
      <Wallet className="h-6 w-6 text-green-600" />
      <span className="font-bold">FinanceFlow</span>
    </div>
  );
}
