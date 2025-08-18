import { Badge } from 'lucide-react';
import { LazyImage } from '@/shared/components/lazy-image';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

import pigImage from '@/shared/assets/images/pig-image.jpg';

export function StatsSection() {
  return (
    <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <SectionLayout>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge>Trusted by millions</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join the financial wellness revolution
              </h2>
              <p className="text-wrap max-w-[600px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our users have saved over $2 billion and achieved their
                financial goals faster than ever before.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">$2B+</div>
                <div className="text-sm text-gray-600">
                  Total savings tracked
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">1M+</div>
                <div className="text-sm text-gray-600">Active users</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">95%</div>
                <div className="text-sm text-gray-600">
                  Goal achievement rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">4.8★</div>
                <div className="text-sm text-gray-600">App store rating</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <LazyImage
              src={pigImage}
              width="600"
              height="400"
              alt="Financial Dashboard"
              className="w-fit aspect-video overflow-hidden rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
