import { Badge } from 'lucide-react';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

export function HowItWorksSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <SectionLayout>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>How it works</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Get started in 3 simple steps
            </h2>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-600">1</span>
            </div>
            <h3 className="text-xl font-bold">Connect Your Accounts</h3>
            <p className="text-gray-600">
              Securely link your bank accounts, credit cards, and investment
              accounts in seconds.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-600">2</span>
            </div>
            <h3 className="text-xl font-bold">Set Your Goals</h3>
            <p className="text-gray-600">
              Define your financial objectives and let our AI create a
              personalized plan to achieve them.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-bold">Track & Optimize</h3>
            <p className="text-gray-600">
              Monitor your progress with real-time insights and get
              recommendations to optimize your finances.
            </p>
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
