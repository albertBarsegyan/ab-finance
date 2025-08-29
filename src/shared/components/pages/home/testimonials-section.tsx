import { Card, CardContent } from '@/shared/components/ui/card';
import { Badge, Star } from 'lucide-react';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
    >
      <SectionLayout>
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>Testimonials</Badge>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">
              What our users say
            </h2>
          </div>
        </div>
        <div className="grid w-full items-stretch gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                "abFinance helped me save $10,000 for my emergency fund in just
                8 months. The budgeting tools are incredible!"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium text-sm sm:text-base">
                    Sarah Johnson
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm">
                    Marketing Manager
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                "Finally, a finance app that actually makes sense. I've reduced
                my spending by 30% without feeling restricted."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium text-sm sm:text-base">
                    Mike Chen
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm">
                    Software Engineer
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                "The investment insights feature helped me optimize my portfolio
                and increase returns by 15% this year."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium text-sm sm:text-base">
                    Emily Rodriguez
                  </div>
                  <div className="text-xs text-gray-600 sm:text-sm">
                    Financial Advisor
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </section>
  );
}
