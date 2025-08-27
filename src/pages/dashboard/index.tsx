import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import {
  AlertTriangle,
  BarChart3,
  CheckCircle,
  Info,
  PieChart,
} from 'lucide-react';

// Sample data for Net Worth chart
const netWorthData: Array<{ month: string; value: number }> = [
  { month: 'Sep 25', value: 1400000 },
  { month: 'Nov 25', value: 1500000 },
  { month: 'Jan 25', value: 1600000 },
  { month: 'Mar 25', value: 1650000 },
  { month: 'May 25', value: 1700000 },
  { month: 'Jul 25', value: 1750000 },
];

// Sample data for Current Holdings chart
const holdingsData: Array<{ name: string; value: number; color: string }> = [
  { name: 'Stocks', value: 800000, color: '#3B82F6' },
  { name: 'Real Estate', value: 600000, color: '#8B5CF6' },
  { name: 'Bonds', value: 400000, color: '#1E40AF' },
  { name: 'Cash', value: 300000, color: '#10B981' },
  { name: 'Commodities', value: 200000, color: '#F59E0B' },
  { name: 'Other', value: 150000, color: '#6B7280' },
  { name: 'Crypto', value: 107881, color: '#9CA3AF' },
];

// Financial metrics data
const financialMetrics: Array<{
  name: string;
  currentValue: number;
  unit: string;
  goalProgress: number;
  goalValue: string;
  progressColor: string;
  overGoal?: boolean;
  overGoalValue?: number;
  status?: string;
}> = [
  {
    name: 'INCOME',
    currentValue: 833.3,
    unit: '/month',
    goalProgress: 19,
    goalValue: '4.5K',
    progressColor: 'bg-blue-500',
  },
  {
    name: 'SPENDINGS',
    currentValue: 750.0,
    unit: '/month',
    goalProgress: 12,
    goalValue: '6.5K',
    progressColor: 'bg-orange-500',
  },
  {
    name: 'SAVINGS',
    currentValue: 83.3,
    unit: '/month',
    goalProgress: 6,
    goalValue: '1.4K',
    progressColor: 'bg-yellow-500',
  },
  {
    name: 'INVESTMENT RETURN',
    currentValue: 0.0,
    unit: '%',
    goalProgress: 0,
    goalValue: '2.0%',
    progressColor: 'bg-gray-300',
  },
  {
    name: 'GROWTH RATE',
    currentValue: 0.0,
    unit: '%',
    goalProgress: 0,
    goalValue: '7.0%',
    progressColor: 'bg-gray-300',
  },
  {
    name: 'DEBT-INCOME RATIO',
    currentValue: 21,
    unit: '%',
    goalProgress: 105,
    goalValue: '20%',
    progressColor: 'bg-blue-500',
    overGoal: true,
    overGoalValue: 5,
  },
  {
    name: 'CASH ON HAND',
    currentValue: 7.4,
    unit: 'K',
    goalProgress: 44,
    goalValue: '17.0K',
    progressColor: 'bg-blue-500',
  },
  {
    name: 'ACCESSIBLE CASH',
    currentValue: 739.0,
    unit: 'K',
    goalProgress: 86,
    goalValue: '854.4K',
    progressColor: 'bg-blue-500',
  },
  {
    name: 'RUNAWAY',
    currentValue: 904,
    unit: 'months',
    goalProgress: 377,
    goalValue: '240 months',
    progressColor: 'bg-green-500',
    status: 'success',
  },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">
          Your financial dashboard overview
        </p>
      </div>

      {/* Top Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Net Worth Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              NET WORTH
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
            <div className="flex gap-1">
              {['1Y', '3Y', '5Y', 'Max'].map(period => (
                <Button
                  key={period}
                  variant={period === '1Y' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 px-3 text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-blue-600">
                    $
                    {netWorthData[
                      netWorthData.length - 1
                    ].value.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Current Net Worth
                  </div>
                </div>
                <div className="flex justify-center space-x-8 text-xs text-muted-foreground">
                  {netWorthData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium">{data.month}</div>
                      <div>${(data.value / 1000000).toFixed(1)}M</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Holdings Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              CURRENT HOLDINGS
            </CardTitle>
            <div className="flex gap-1">
              {['Assets', 'Debt'].map(type => (
                <Button
                  key={type}
                  variant={type === 'Assets' ? 'default' : 'outline'}
                  size="sm"
                  className="h-7 px-3 text-xs"
                >
                  {type}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <PieChart className="h-16 w-16 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">
                    $
                    {holdingsData
                      .reduce((sum, item) => sum + item.value, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Value
                  </div>
                </div>
              </div>
            </div>

            {/* Holdings Legend */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {holdingsData.map(item => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="ml-auto font-medium">
                    ${(item.value / 1000).toFixed(0)}K
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Metrics Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Financial Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {financialMetrics.map(metric => (
              <div key={metric.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{metric.name}</h3>
                  {metric.status === 'success' && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {metric.overGoal && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    {metric.currentValue.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.unit}
                  </span>
                  {metric.overGoal && (
                    <span className="text-sm text-red-500 flex items-center gap-1">
                      ▲ {metric.overGoalValue}%
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {metric.goalProgress}% of goal
                    </span>
                    <span className="text-muted-foreground">
                      {metric.goalValue}
                    </span>
                  </div>

                  <div className="relative">
                    <Progress
                      value={Math.min(metric.goalProgress, 100)}
                      className="h-2"
                    />
                    {metric.overGoal && (
                      <div
                        className="absolute top-0 left-0 h-2 bg-red-500 rounded-full"
                        style={{
                          width: `${Math.min(metric.overGoalValue || 0, 100)}%`,
                          left: '100%',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
