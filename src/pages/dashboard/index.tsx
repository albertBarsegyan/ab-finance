import { useMemo } from 'react';
import { useAuth } from '@/shared/hooks/auth';
import { useGoalSelection } from '@/app/providers/goal';
import { useIncomes } from '@/entities/incomes/model/use-incomes';
import { useOutcomes } from '@/entities/outcomes/model/use-outcomes';
import { formatCurrencyWithDecimals, getCurrencySymbol } from '@/shared/lib/currency';
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
import { AlertTriangle, CheckCircle, Download, Info } from 'lucide-react';

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

  const { incomes, loading: incomesLoading } = useIncomes(
    user?.uid,
    selectedGoal?.id || undefined
  );
  const { outcomes, loading: outcomesLoading } = useOutcomes(
    user?.uid,
    selectedGoal?.id || undefined
  );

  // Aggregate monthly data for charts (last 6 months)
  const { monthlySeries, totalIncome, totalOutcome } = useMemo(() => {
    const byMonth = new Map<string, { income: number; outcome: number }>();

    const monthKey = (iso?: unknown) => {
      if (!iso || typeof iso !== 'string') return 'Unknown';
      const d = new Date(iso);
      if (Number.isNaN(d.getTime())) return 'Unknown';
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    };

    for (const inc of incomes) {
      const key = monthKey(inc.createdAt);
      const prev = byMonth.get(key) || { income: 0, outcome: 0 };
      byMonth.set(key, { ...prev, income: prev.income + (inc.amount || 0) });
    }

    for (const out of outcomes) {
      const key = monthKey(out.createdAt);
      const prev = byMonth.get(key) || { income: 0, outcome: 0 };
      const amount =
        typeof out.amount === 'string'
          ? parseFloat(out.amount)
          : Number(out.amount || 0);
      byMonth.set(key, { ...prev, outcome: prev.outcome + (amount || 0) });
    }

    const sortedKeys = Array.from(byMonth.keys()).sort();
    const lastSixKeys = sortedKeys.slice(-6);
    const series = lastSixKeys.map(k => ({
      month: k,
      income: byMonth.get(k)?.income || 0,
      spendings: byMonth.get(k)?.outcome || 0,
      savings: (byMonth.get(k)?.income || 0) - (byMonth.get(k)?.outcome || 0),
    }));

    const totals = series.reduce(
      (acc, cur) => {
        acc.totalIncome += cur.income;
        acc.totalOutcome += cur.spendings;
        return acc;
      },
      { totalIncome: 0, totalOutcome: 0 }
    );

    return { monthlySeries: series, ...totals };
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

  const handleExportCombined = () => {
    exportCombinedToCSV(incomes, outcomes, selectedGoal, currencyCode);
  };

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
              ) : monthlySeries.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  {t('dashboard.noDataToDisplay')}
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlySeries}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="income"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="spendings"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={false}
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
                    {formatCurrencyWithDecimals(metric.currentValue, currencyCode)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('dashboard.thisPeriod')}</span>
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

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto"
          onClick={handleExportCombined}
          disabled={incomes.length === 0 && outcomes.length === 0}
        >
          <Download className="mr-2 h-4 w-4" />
          {t('dashboard.exportAllData')}
        </Button>
      </div>
    </div>
  );
}
