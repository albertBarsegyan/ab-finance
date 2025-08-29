import type { ReactNode } from 'react';
import React from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch() {
    // In a real app, report to monitoring service here
    // console.error('Uncaught error:', error, errorInfo);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', this.handleWindowError);
      window.addEventListener(
        'unhandledrejection',
        this.handleUnhandledRejection
      );
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('error', this.handleWindowError);
      window.removeEventListener(
        'unhandledrejection',
        this.handleUnhandledRejection
      );
    }
  }

  handleWindowError = (event: ErrorEvent) => {
    const error =
      event?.error instanceof Error
        ? event.error
        : new Error(event?.message || 'Unknown error');
    this.setState({ hasError: true, error });
  };

  handleUnhandledRejection = (event: PromiseRejectionEvent) => {
    const reason = event?.reason;
    const error =
      reason instanceof Error
        ? reason
        : new Error(
            typeof reason === 'string' ? reason : 'Unhandled promise rejection'
          );
    this.setState({ hasError: true, error });
  };

  handleRetry = () => {
    // Try a soft reset first
    this.setState({ hasError: false, error: null });
    // If state is unrecoverable, offer hard reload
    // window.location.reload();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (!hasError) return children;

    if (fallback) return <>{fallback}</>;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            An unexpected error occurred. Please try again.
          </p>
          {process.env.NODE_ENV !== 'production' && error && (
            <pre className="text-left overflow-auto max-h-48 bg-gray-100 p-3 rounded text-sm text-red-700 mb-4">
              {error.message}
            </pre>
          )}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700"
            >
              Reload page
            </button>
          </div>
        </div>
      </div>
    );
  }
}
