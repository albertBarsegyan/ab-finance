import i18n from './i18n';

export interface ExportableIncome {
  id: string;
  amount: number;
  note: string;
  createdAt?: unknown;
  goalId: string;
}

export interface ExportableOutcome {
  id: string;
  amount: string;
  note: string;
  createdAt?: unknown;
  goalId: string;
}

export interface GoalInfo {
  id: string;
  goal: string;
  goalCurrency: string;
}

/**
 * Converts data to CSV format
 */
function convertToCSV(data: Record<string, unknown>[], headers: string[]): string {
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
}

/**
 * Downloads CSV content as a file
 */
function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Formats date for CSV export
 */
function formatDateForCSV(date: unknown): string {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date as string | number);
    return dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch {
    return '';
  }
}

/**
 * Exports incomes to CSV
 */
export function exportIncomesToCSV(
  incomes: ExportableIncome[],
  goalInfo: GoalInfo | null,
  currencyCode: string = 'USD'
): void {
  const headers = [
    i18n.t('csv.date'),
    i18n.t('csv.description'),
    i18n.t('csv.amount'),
    i18n.t('csv.currency'),
    i18n.t('csv.goal'),
    i18n.t('csv.goalId')
  ];

  const csvData = incomes.map(income => ({
    [i18n.t('csv.date')]: formatDateForCSV(income.createdAt),
    [i18n.t('csv.description')]: income.note || i18n.t('income.defaultNote'),
    [i18n.t('csv.amount')]: income.amount,
    [i18n.t('csv.currency')]: currencyCode,
    [i18n.t('csv.goal')]: goalInfo?.goal || i18n.t('goals.unknownGoal'),
    [i18n.t('csv.goalId')]: income.goalId
  }));

  const csvContent = convertToCSV(csvData, headers);
  const goalName = goalInfo?.goal ? goalInfo.goal.replace(/[^a-zA-Z0-9]/g, '_') : 'all_goals';
  const filename = `incomes_${goalName}_${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}

/**
 * Exports outcomes to CSV
 */
export function exportOutcomesToCSV(
  outcomes: ExportableOutcome[],
  goalInfo: GoalInfo | null,
  currencyCode: string = 'USD'
): void {
  const headers = [
    i18n.t('csv.date'),
    i18n.t('csv.description'),
    i18n.t('csv.amount'),
    i18n.t('csv.currency'),
    i18n.t('csv.goal'),
    i18n.t('csv.goalId')
  ];

  const csvData = outcomes.map(outcome => ({
    [i18n.t('csv.date')]: formatDateForCSV(outcome.createdAt),
    [i18n.t('csv.description')]: outcome.note || i18n.t('expenses.defaultNote'),
    [i18n.t('csv.amount')]: outcome.amount,
    [i18n.t('csv.currency')]: currencyCode,
    [i18n.t('csv.goal')]: goalInfo?.goal || i18n.t('goals.unknownGoal'),
    [i18n.t('csv.goalId')]: outcome.goalId
  }));

  const csvContent = convertToCSV(csvData, headers);
  const goalName = goalInfo?.goal ? goalInfo.goal.replace(/[^a-zA-Z0-9]/g, '_') : 'all_goals';
  const filename = `expenses_${goalName}_${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}

/**
 * Exports combined incomes and outcomes to CSV
 */
export function exportCombinedToCSV(
  incomes: ExportableIncome[],
  outcomes: ExportableOutcome[],
  goalInfo: GoalInfo | null,
  currencyCode: string = 'USD'
): void {
  const headers = [
    i18n.t('csv.date'),
    'Type',
    i18n.t('csv.description'),
    i18n.t('csv.amount'),
    i18n.t('csv.currency'),
    i18n.t('csv.goal'),
    i18n.t('csv.goalId')
  ];

  const incomeData = incomes.map(income => ({
    [i18n.t('csv.date')]: formatDateForCSV(income.createdAt),
    'Type': i18n.t('income.defaultNote'),
    [i18n.t('csv.description')]: income.note || i18n.t('income.defaultNote'),
    [i18n.t('csv.amount')]: income.amount,
    [i18n.t('csv.currency')]: currencyCode,
    [i18n.t('csv.goal')]: goalInfo?.goal || i18n.t('goals.unknownGoal'),
    [i18n.t('csv.goalId')]: income.goalId
  }));

  const outcomeData = outcomes.map(outcome => ({
    [i18n.t('csv.date')]: formatDateForCSV(outcome.createdAt),
    'Type': i18n.t('expenses.defaultNote'),
    [i18n.t('csv.description')]: outcome.note || i18n.t('expenses.defaultNote'),
    [i18n.t('csv.amount')]: outcome.amount,
    [i18n.t('csv.currency')]: currencyCode,
    [i18n.t('csv.goal')]: goalInfo?.goal || i18n.t('goals.unknownGoal'),
    [i18n.t('csv.goalId')]: outcome.goalId
  }));

  // Combine and sort by date (newest first)
  const combinedData = [...incomeData, ...outcomeData].sort((a, b) => {
    const dateA = new Date(a.Date as string).getTime();
    const dateB = new Date(b.Date as string).getTime();
    return dateB - dateA;
  });

  const csvContent = convertToCSV(combinedData, headers);
  const goalName = goalInfo?.goal ? goalInfo.goal.replace(/[^a-zA-Z0-9]/g, '_') : 'all_goals';
  const filename = `transactions_${goalName}_${new Date().toISOString().split('T')[0]}.csv`;
  
  downloadCSV(csvContent, filename);
}
