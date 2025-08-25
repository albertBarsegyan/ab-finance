/**
 * Sanitizes a string to contain only numeric characters,
 * respecting decimal, negative, and maxDecimals options.
 */
export function sanitizeNumeric(
  value: string | number | null | undefined,
  options: {
    allowDecimal?: boolean;
    allowNegative?: boolean;
    maxDecimals?: number | null;
  } = {}
): string {
  const {
    allowDecimal = false,
    allowNegative = false,
    maxDecimals = null,
  } = options;

  let str = String(value ?? '');

  // Remove invalid chars (keep digits, optional '-' and '.')
  const validChars = `0-9${allowDecimal ? '.' : ''}${allowNegative ? '-' : ''}`;
  str = str.replace(new RegExp(`[^${validChars}]`, 'g'), '');

  // Handle negative sign (only at start)
  if (allowNegative) {
    const hasMinus = str.startsWith('-');
    str = str.replace(/-/g, '');
    if (hasMinus) str = '-' + str;
  } else {
    str = str.replace(/-/g, '');
  }

  // Handle decimals (only first dot allowed)
  if (allowDecimal) {
    const [intPart, ...rest] = str.split('.');
    str = intPart;
    if (rest.length) str += '.' + rest.join('').replace(/\./g, '');
  } else {
    str = str.replace(/\./g, '');
  }

  // Limit decimals if needed
  if (allowDecimal && maxDecimals != null && str.includes('.')) {
    const [intPart, fracPart] = str.split('.');
    str = intPart + '.' + fracPart.slice(0, maxDecimals);
  }

  return str;
}
