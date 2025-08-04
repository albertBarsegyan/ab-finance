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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              What our users say
            </h2>
          </div>
        </div>
        <div className="grid w-full items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-8">
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
              <p className="text-gray-600 mb-4">
                "abFinance helped me save $10,000 for my emergency fund in just
                8 months. The budgeting tools are incredible!"
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Marketing Manager</div>
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
              <p className="text-gray-600 mb-4">
                "Finally, a finance app that actually makes sense. I've reduced
                my spending by 30% without feeling restricted."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium">Mike Chen</div>
                  <div className="text-sm text-gray-600">Software Engineer</div>
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
              <p className="text-gray-600 mb-4">
                "The investment insights feature helped me optimize my portfolio
                and increase returns by 15% this year."
              </p>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-medium">Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Financial Advisor</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SectionLayout>
    </section>
  );
}
