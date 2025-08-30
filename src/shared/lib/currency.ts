import { currencies } from '@/shared/constants/currencies';

/**
 * Get currency symbol by currency code
 * @param currencyCode - The currency code (e.g., 'USD', 'EUR')
 * @returns The currency symbol (e.g., '$', '€')
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = currencies.find(c => c.code === currencyCode);
  return currency?.symbol || '$';
}

/**
 * Format amount with currency symbol
 * @param amount - The amount to format
 * @param currencyCode - The currency code
 * @returns Formatted string with currency symbol
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Format amount with currency symbol and decimal places
 * @param amount - The amount to format
 * @param currencyCode - The currency code
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string with currency symbol and decimals
 */
export function formatCurrencyWithDecimals(
  amount: number,
  currencyCode: string,
  decimals: number = 2
): string {
  const symbol = getCurrencySymbol(currencyCode);
  return `${symbol}${amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
