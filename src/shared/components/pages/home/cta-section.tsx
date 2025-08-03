import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Ready to transform your finances?
            </h2>
            <p className="mx-auto max-w-[600px] text-green-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join over 1 million users who have taken control of their
              financial future with FinanceFlow.
            </p>
          </div>

          <div className="w-full max-w-sm space-y-2">
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-lg flex-1 bg-white"
              />
              <Button type="submit" variant="secondary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-green-100">
              Free to download. No credit card required.
            </p>
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Free forever plan</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
