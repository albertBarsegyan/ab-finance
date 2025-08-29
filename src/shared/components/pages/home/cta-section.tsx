import { Button } from '@/shared/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appPath } from '@/shared/constants/app-path.ts';

export function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600">
      <div className="flex px-4 md:px-6 w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white">
              Ready to economy your finances?
            </h2>
            <p className="mx-auto max-w-[600px] text-green-100 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join over 1 million users who have taken control of their
              financial future with abFinance.
            </p>
          </div>

          <div className="w-full max-w-sm space-y-2">
            <Button
              onClick={() => navigate(appPath.REGISTER)}
              type="submit"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-xs text-green-100">
              Free to download. No credit card required.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 pt-4 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Freemium plan</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs sm:text-sm">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <CheckCircle className="h-4 w-4" />
              <span className="text-xs sm:text-sm">24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
