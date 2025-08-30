import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import {
  Badge,
  PieChart,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
} from 'lucide-react';
import { SectionLayout } from '@/shared/components/layouts/section-layout.tsx';

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <SectionLayout className="items-center justify-center">
        <div className="flex flex-col items-center justify-between text-center">
          <div className="space-y-2 max-w-[760px]">
            <Badge>Features</Badge>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-5xl">
              Everything you need to manage your money
            </h2>
            <p className="max-w-[900px] text-gray-600 text-sm sm:text-base md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From expense tracking to investment insights, our comprehensive
              suite of tools helps you make smarter financial decisions.
            </p>
          </div>
        </div>
        <div className="w-full grid items-center gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardHeader>
              <PieChart className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">
                Smart Budgeting
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Create personalized budgets that adapt to your spending patterns
                and help you stay on track.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">
                Expense Tracking
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Automatically categorize transactions and get insights into
                where your money goes each month.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">Goal Setting</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Set and track financial goals like emergency funds, vacations,
                or major purchases with visual progress.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">
                GOOGLE-Level Security
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Your data is protected with 256-bit encryption and read-only
                access to your accounts.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Smartphone className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">Mobile First</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Access your finances anywhere with our intuitive mobile app
                available on iOS and Android.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
              <CardTitle className="text-lg sm:text-xl">
                Investment Insights
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Get personalized investment recommendations and track your
                portfolio performance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SectionLayout>
    </section>
  );
}
