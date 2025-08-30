import { Button } from '@/shared/components/ui/button';
import { Calendar } from '@/shared/components/ui/calendar';
import { Label } from '@/shared/components/ui/label';
import { useState, useEffect } from 'react';
import {
  format,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

export type Duration = {
  days: number;
  months: number;
  years: number;
};

type DurationPickerProps = {
  value: Duration;
  onChange: (duration: Duration) => void;
  error?: string;
  label?: string;
  description?: string;
};

export function DurationPicker({
  value,
  onChange,
  error,
  label = 'Goal Duration',
  description = 'Select your target date to achieve your financial goal.',
}: DurationPickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [localDuration, setLocalDuration] = useState<Duration>(value);

  // Set minimum date to tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  useEffect(() => {
    setLocalDuration(value);
  }, [value]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);

    const today = new Date();
    const years = differenceInYears(date, today);
    const months = differenceInMonths(date, today) % 12;
    const days = differenceInDays(date, today) % 30;

    if (differenceInDays(date, today) > 0) {
      const newDuration = { years, months, days };
      setLocalDuration(newDuration);
      onChange(newDuration);
    } else {
      // If selected date is in the past, set to 0
      const newDuration = { years: 0, months: 0, days: 0 };
      setLocalDuration(newDuration);
      onChange(newDuration);
    }
  };

  const handleQuickDateSelect = (days: number) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + days);
    handleDateSelect(targetDate);
  };

  const calculateTotalDays = () => {
    if (!selectedDate) return 0;
    const today = new Date();
    return Math.max(0, differenceInDays(selectedDate, today));
  };

  const isDurationValid = selectedDate && calculateTotalDays() > 0;

  const getFormattedDuration = () => {
    if (!isDurationValid) return '';

    const { years, months, days } = localDuration;
    const parts = [];

    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);

    return parts.join(', ') || 'Less than 1 month';
  };

  const getTimeframeDescription = () => {
    if (!selectedDate) return '';

    const totalDays = calculateTotalDays();
    if (totalDays <= 30) return 'Short-term goal';
    if (totalDays <= 90) return 'Medium-term goal';
    if (totalDays <= 365) return 'Long-term goal';
    return 'Very long-term goal';
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="goal-duration" className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            🎯
          </span>
          {label}
        </Label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Quick date selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickDateSelect(30)}
          className="text-xs"
        >
          1 Month
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickDateSelect(90)}
          className="text-xs"
        >
          3 Months
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickDateSelect(180)}
          className="text-xs"
        >
          6 Months
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleQuickDateSelect(365)}
          className="text-xs"
        >
          1 Year
        </Button>
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        disabled={date => date < minDate}
        className="rounded-md border mx-auto"
        initialFocus
      />

      {/* Selected date display */}
      {selectedDate && (
        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-800">
            Selected: {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
          </p>
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Select a future date for your goal (minimum: tomorrow)
      </p>

      <div className="text-sm text-muted-foreground text-center">
        {isDurationValid ? (
          <div className="space-y-2">
            <p className="text-green-600 font-medium">
              Your goal duration: {getFormattedDuration()}
            </p>
            <p className="text-blue-600 text-xs">{getTimeframeDescription()}</p>
            <p className="text-blue-600 text-xs">
              Total: approximately {calculateTotalDays()} days
            </p>
          </div>
        ) : (
          <p className="text-orange-600">
            Please select a future date for your goal
          </p>
        )}
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
