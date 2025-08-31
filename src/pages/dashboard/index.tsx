import { useMemo } from 'react';
import { useAuth } from '@/shared/hooks/auth';
import { useGoalSelection } from '@/app/providers/goal';
import { useIncomes } from '@/entities/incomes/model/use-incomes';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes';
import {
  formatCurrencyWithDecimals,
  getCurrencySymbol,
} from '@/shared/lib/currency';
import { exportCombinedToCSV } from '@/shared/lib/csv-export';
import { useTranslation } from 'react-i18next';

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
  CheckCircle,
  Download,
  Info,
  Plus,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { useModal } from '@/shared/hooks/modal';

// Recharts
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function DashboardPage() {
  const { user } = useAuth();
  const { selectedGoal } = useGoalSelection();
  const { t } = useTranslation();
  const { openModal } = useModal();

  const { incomes, loading: incomesLoading } = useIncomes(
    user?.uid,
    selectedGoal?.id || undefined
  );
  const { outcomes, loading: outcomesLoading } = useOutcomes(
    user?.uid,
    selectedGoal?.id || undefined
  );

  // Aggregate daily data for charts (last 30 days)
  const { dailySeries, totalIncome, totalOutcome } = useMemo(() => {
    const byDay = new Map<string, { income: number; outcome: number }>();

    const dayKey = (iso?: unknown) => {
      if (!iso || typeof iso !== 'string') return 'Unknown';
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return 'Unknown';
      return d.toISOString().split('T')[0]; // YYYY-MM-DD format
    };

    for (const inc of incomes) {
      const key = dayKey(inc.createdAt);
      const prev = byDay.get(key) || { income: 0, outcome: 0 };
      byDay.set(key, { ...prev, income: prev.income + (inc.amount || 0) });
    }

    for (const out of outcomes) {
      const key = dayKey(out.createdAt);
      const prev = byDay.get(key) || { income: 0, outcome: 0 };
      const amount =
        typeof out.amount === 'string'
          ? parseFloat(out.amount)
          : Number(out.amount || 0);
      byDay.set(key, { ...prev, outcome: prev.outcome + (amount || 0) });
    }

    // Generate last 30 days
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const series = last30Days.map(day => {
      const dayData = byDay.get(day) || { income: 0, outcome: 0 };
      return {
        day: new Date(day).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        income: dayData.income,
        spendings: dayData.outcome,
        savings: dayData.income - dayData.outcome,
      };
    });

    const totals = series.reduce(
      (acc, cur) => {
        acc.totalIncome += cur.income;
        acc.totalOutcome += cur.spendings;
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0 }
    );

    return { dailySeries: series, ...totals };
  }, [incomes, outcomes]);

  const savingsTotal = Math.max(totalIncome - totalOutcome, 0);

  const holdingsData = useMemo(
    () => [
      { name: 'Savings', value: savingsTotal, color: '#10B981' },
      { name: 'Spendings', value: totalOutcome, color: '#F59E0B' },
      { name: 'Income', value: totalIncome, color: '#3B82F6' },
    ],
    [savingsTotal, totalOutcome, totalIncome]
  );

  const loading = incomesLoading || outcomesLoading;

  // Get currency from selected goal, default to USD
  const currencyCode = selectedGoal?.goalCurrency || 'USD';
  const currencySymbol = getCurrencySymbol(currencyCode);

  // Category breakdown data
  const {
    incomeCategories,
    expenseCategories,
    savingsRate,
    recentTransactions,
  } = useMemo(() => {
    // Income categories breakdown
    const incomeCategoryMap = new Map<string, number>();
    incomes.forEach(income => {
      const type = income.incomeType || '🔧 Other';
      const amount = income.amount || 0;
      incomeCategoryMap.set(type, (incomeCategoryMap.get(type) || 0) + amount);
    });

    const incomeCategories = Array.from(incomeCategoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Expense categories breakdown
    const expenseCategoryMap = new Map<string, number>();
    outcomes.forEach(outcome => {
      const type = outcome.outcomeType || '🔧 Other';
      const amount =
        typeof outcome.amount === 'string'
          ? parseFloat(outcome.amount)
          : Number(outcome.amount || 0);
      expenseCategoryMap.set(
        type,
        (expenseCategoryMap.get(type) || 0) + amount
      );
    });

    const expenseCategories = Array.from(expenseCategoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Calculate savings rate
    const savingsRate =
      totalIncome > 0 ? ((totalIncome - totalOutcome) / totalIncome) * 100 : 0;

    // Recent transactions (last 10)
    const allTransactions = [
      ...incomes.map(income => ({
        id: income.id,
        type: 'income' as const,
        category: income.incomeType || '🔧 Other',
        description: income.note || 'Income',
        amount: income.amount || 0,
        date: income.createdAt
          ? new Date(income.createdAt as string)
          : new Date(),
      })),
      ...outcomes.map(outcome => ({
        id: outcome.id,
        type: 'expense' as const,
        category: outcome.outcomeType || '🔧 Other',
        description: outcome.note || 'Expense',
        amount:
          typeof outcome.amount === 'string'
            ? parseFloat(outcome.amount)
            : Number(outcome.amount || 0),
        date: outcome.createdAt
          ? new Date(outcome.createdAt as number)
          : new Date(),
      })),
    ]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10);

    return {
      incomeCategories,
      expenseCategories,
      savingsRate,
      recentTransactions: allTransactions,
    };
  }, [incomes, outcomes, totalIncome, totalOutcome]);

  const handleExportCombined = () => {
    exportCombinedToCSV(incomes, outcomes, selectedGoal, currencyCode);
  };

  // Calculate goal-related metrics
  const goalMetrics = useMemo(() => {
    if (!selectedGoal) {
      return {
        goalAmount: 0,
        daysRemaining: 0,
        dailySavingsNeeded: 0,
        dailySpendingLimit: 0,
        currentProgress: 0,
        isGoalAchievable: false,
      };
    }

    const goalAmount = parseFloat(selectedGoal.goalPrice) || 0;
    const goalDuration = selectedGoal.goalDuration || {
      days: 0,
      months: 0,
      years: 0,
    };

    // Calculate total days remaining
    const totalDaysRemaining =
      goalDuration.years * 365 + goalDuration.months * 30 + goalDuration.days;

    // Calculate current progress (how much has been saved towards this goal)
    const currentSavings = Math.max(totalIncome - totalOutcome, 0);
    const currentProgress =
      goalAmount > 0 ? (currentSavings / goalAmount) * 100 : 0;

    // Calculate daily savings needed to reach goal
    const remainingAmount = Math.max(goalAmount - currentSavings, 0);
    const dailySavingsNeeded =
      totalDaysRemaining > 0 ? remainingAmount / totalDaysRemaining : 0;

    // Calculate daily spending limit (based on average daily income)
    const averageDailyIncome = totalIncome > 0 ? totalIncome / 30 : 0; // Assuming 30 days of data
    const dailySpendingLimit = Math.max(
      averageDailyIncome - dailySavingsNeeded,
      0
    );

    // Check if goal is achievable
    const isGoalAchievable = dailySavingsNeeded <= averageDailyIncome;

    return {
      goalAmount,
      daysRemaining: totalDaysRemaining,
      dailySavingsNeeded,
      dailySpendingLimit,
      currentProgress,
      isGoalAchievable,
    };
  }, [selectedGoal, totalIncome, totalOutcome]);

  const financialMetrics = useMemo(
    () => [
      {
        name: t('dashboard.income'),
        currentValue: totalIncome,
        unit: currencySymbol,
        goalProgress: 0,
        goalValue: '',
      },
      {
        name: t('dashboard.spendings'),
        currentValue: totalOutcome,
        unit: currencySymbol,
        goalProgress: 0,
        goalValue: '',
      },
      {
        name: t('dashboard.savings'),
        currentValue: savingsTotal,
        unit: currencySymbol,
        goalProgress: 0,
        goalValue: '',
      },
    ],
    [totalIncome, totalOutcome, savingsTotal, currencySymbol, t]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t('dashboard.overview')}
        </h1>
        <p className="text-muted-foreground">
          {selectedGoal
            ? `${t('dashboard.goal')}: ${selectedGoal.goal}`
            : t('dashboard.yourFinancialDashboard')}
        </p>
      </div>

      {/* Top Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Income/Spendings/Savings Trend */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
              {t('dashboard.trend')}
              <Info className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              {loading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  {t('dashboard.loadingChart')}
                </div>
              ) : dailySeries.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  {t('dashboard.noDataToDisplay')}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={dailySeries}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrencyWithDecimals(Number(value), currencyCode),
                        name === 'income'
                          ? 'Income'
                          : name === 'spendings'
                            ? 'Expenses'
                            : 'Savings',
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                      name="Income"
                    />
                    <Line
                      type="monotone"
                      dataKey="spendings"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                      name="Expenses"
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
                      name="Savings"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Breakdown Pie */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold sm:text-lg">
              {t('dashboard.breakdown')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px]">
              {loading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  {t('dashboard.loadingChart')}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={holdingsData}
                      outerRadius={80}
                      label
                    >
                      {holdingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress Section */}
      {selectedGoal && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
              {t('dashboard.goalProgress')}
              {goalMetrics.isGoalAchievable ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-orange-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {goalMetrics.currentProgress.toFixed(1)}%
                  </span>
                </div>
                <Progress value={goalMetrics.currentProgress} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  {formatCurrencyWithDecimals(
                    Math.max(totalIncome - totalOutcome, 0),
                    currencyCode
                  )}{' '}
                  saved of{' '}
                  {formatCurrencyWithDecimals(
                    goalMetrics.goalAmount,
                    currencyCode
                  )}{' '}
                  target
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {/* Goal Amount */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Goal Amount</h3>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold sm:text-2xl">
                      {formatCurrencyWithDecimals(
                        goalMetrics.goalAmount,
                        currencyCode
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Target amount to save
                  </div>
                </div>

                {/* Days Remaining */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Days Remaining</h3>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold sm:text-2xl">
                      {goalMetrics.daysRemaining}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Until deadline
                  </div>
                </div>

                {/* Daily Savings Needed */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">
                      Daily Savings Needed
                    </h3>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold sm:text-2xl text-green-600">
                      {formatCurrencyWithDecimals(
                        goalMetrics.dailySavingsNeeded,
                        currencyCode
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Per day to reach goal
                  </div>
                </div>

                {/* Daily Spending Limit */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">
                      Daily Spending Limit
                    </h3>
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold sm:text-2xl text-red-600">
                      {formatCurrencyWithDecimals(
                        goalMetrics.dailySpendingLimit,
                        currencyCode
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Max per day to stay on track
                  </div>
                </div>
              </div>

              {/* Goal Status */}
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Goal Status</h3>
                    <p className="text-sm text-muted-foreground">
                      {goalMetrics.isGoalAchievable
                        ? "You're on track to reach your goal!"
                        : 'Consider adjusting your savings or spending to reach your goal.'}
                    </p>
                  </div>
                  {goalMetrics.isGoalAchievable ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-8 w-8 text-orange-500" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Financial Metrics Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold sm:text-lg">
            {t('dashboard.financialMetrics')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {financialMetrics.map(metric => (
              <div key={metric.name} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{metric.name}</h3>
                  {metric.name === 'SAVINGS' && savingsTotal > 0 && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {metric.name === 'SPENDINGS' && (
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold sm:text-2xl">
                    {formatCurrencyWithDecimals(
                      metric.currentValue,
                      currencyCode
                    )}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t('dashboard.thisPeriod')}
                    </span>
                    <span className="text-muted-foreground">
                      {currencyCode} ({currencySymbol})
                    </span>
                  </div>

                  <div className="relative">
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Income Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Income Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {loading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Loading...
                </div>
              ) : incomeCategories.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No income data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={incomeCategories}
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {incomeCategories.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${index * 45}, 70%, 50%)`}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={value =>
                        formatCurrencyWithDecimals(Number(value), currencyCode)
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Expense Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              Expense Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              {loading ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Loading...
                </div>
              ) : expenseCategories.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No expense data available
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={expenseCategories}
                      outerRadius={80}
                      fill="#8884d8"
                      label={({ name, percent }) =>
                        `${name} ${((percent || 0) * 100).toFixed(0)}%`
                      }
                    >
                      {expenseCategories.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(${index * 45 + 180}, 70%, 50%)`}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={value =>
                        formatCurrencyWithDecimals(Number(value), currencyCode)
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Analytics & Recent Transactions */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Savings Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Savings Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Savings Rate</span>
                <span
                  className={`text-lg font-bold ${savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600'}`}
                >
                  {savingsRate.toFixed(1)}%
                </span>
              </div>
              <Progress value={Math.min(savingsRate, 100)} className="h-2" />
              <div className="text-xs text-muted-foreground">
                {savingsRate >= 20
                  ? 'Excellent savings rate!'
                  : savingsRate >= 10
                    ? 'Good savings rate'
                    : 'Consider increasing your savings rate'}
              </div>

              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Total Income</div>
                    <div className="font-semibold text-green-600">
                      {formatCurrencyWithDecimals(totalIncome, currencyCode)}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Expenses</div>
                    <div className="font-semibold text-red-600">
                      {formatCurrencyWithDecimals(totalOutcome, currencyCode)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold sm:text-lg">
              Recent Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-4 text-muted-foreground">
                  Loading...
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No transactions yet
                </div>
              ) : (
                recentTransactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          transaction.type === 'income'
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {transaction.type === 'income' ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold text-sm ${
                          transaction.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {transaction.type === 'income' ? '+' : '-'}
                        {formatCurrencyWithDecimals(
                          transaction.amount,
                          currencyCode
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.date.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold sm:text-lg flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => openModal('add-income')}
            >
              <TrendingUp className="h-6 w-6 text-green-600" />
              <span className="text-sm">Add Income</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => openModal('add-outcome')}
            >
              <TrendingDown className="h-6 w-6 text-red-600" />
              <span className="text-sm">Add Expense</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={() => openModal('add-goal')}
            >
              <CheckCircle className="h-6 w-6 text-blue-600" />
              <span className="text-sm">Add Goal</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col gap-2"
              onClick={handleExportCombined}
              disabled={incomes.length === 0 && outcomes.length === 0}
            >
              <Download className="h-6 w-6 text-gray-600" />
              <span className="text-sm">Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
