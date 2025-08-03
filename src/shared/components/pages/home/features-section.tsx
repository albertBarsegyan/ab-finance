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

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>Features</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything you need to manage your money
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From expense tracking to investment insights, our comprehensive
              suite of tools helps you make smarter financial decisions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardHeader>
              <PieChart className="h-10 w-10 text-green-600" />
              <CardTitle>Smart Budgeting</CardTitle>
              <CardDescription>
                Create personalized budgets that adapt to your spending patterns
                and help you stay on track.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600" />
              <CardTitle>Expense Tracking</CardTitle>
              <CardDescription>
                Automatically categorize transactions and get insights into
                where your money goes each month.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-green-600" />
              <CardTitle>Goal Setting</CardTitle>
              <CardDescription>
                Set and track financial goals like emergency funds, vacations,
                or major purchases with visual progress.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-green-600" />
              <CardTitle>Bank-Level Security</CardTitle>
              <CardDescription>
                Your data is protected with 256-bit encryption and read-only
                access to your accounts.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Smartphone className="h-10 w-10 text-green-600" />
              <CardTitle>Mobile First</CardTitle>
              <CardDescription>
                Access your finances anywhere with our intuitive mobile app
                available on iOS and Android.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-green-600" />
              <CardTitle>Investment Insights</CardTitle>
              <CardDescription>
                Get personalized investment recommendations and track your
                portfolio performance.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}
