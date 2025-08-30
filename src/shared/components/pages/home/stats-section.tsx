import { Badge } from 'lucide-react';
import { LazyImage } from '@/shared/components/lazy-image';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

import familyImage from '@/shared/assets/images/family-background.png';

export function StatsSection() {
  return (
    <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <SectionLayout>
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge>Trusted by millions</Badge>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                Join the financial wellness revolution
              </h2>
              <p className="text-wrap max-w-[600px] text-gray-600 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our users have saved over $2 billion and achieved their
                financial goals faster than ever before.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                  $2B+
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Total savings tracked
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                  1M+
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Active users
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                  95%
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  Goal achievement rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600 sm:text-3xl">
                  4.8★
                </div>
                <div className="text-xs text-gray-600 sm:text-sm">
                  App store rating
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <LazyImage
              src={familyImage}
              width="800"
              height="800"
              alt="Financial Dashboard"
              className="w-full overflow-hidden rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
