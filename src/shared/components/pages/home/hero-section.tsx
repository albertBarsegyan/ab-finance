import { Button } from '@/shared/components/ui/button';
import { Badge, Star } from 'lucide-react';
import { LazyImage } from '@/shared/components/lazy-image';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

import pigImage from '@/shared/assets/images/pig-image.jpg';
import { appPath } from '@/shared/constants/app-path.ts';

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-green-50 to-emerald-50">
      <SectionLayout>
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100">
                {'#1 Personal Finance App'}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Take Control of Your Financial Future
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Track expenses, set budgets, and achieve your financial goals
                with our intelligent personal finance platform. Join over 1
                million users building wealth.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <a href={appPath.REGISTER}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Star className="mr-2 h-4 w-4" />
                  Get started
                </Button>
              </a>
              {/*<Button variant="outline" size="lg">*/}
              {/*  <Play className="mr-2 h-4 w-4" />*/}
              {/*  Watch Demo*/}
              {/*</Button>*/}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8/5</span>
              </div>
              <span>{'•'}</span>
              <span>1M+ downloads</span>
              <span>{'•'}</span>
              <span>Bank-level security</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <LazyImage
              src={pigImage}
              width="600"
              height="400"
              alt="abFinance App Screenshot"
              className="w-full max-w-[600px] overflow-hidden rounded-xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </SectionLayout>
    </section>
  );
}
