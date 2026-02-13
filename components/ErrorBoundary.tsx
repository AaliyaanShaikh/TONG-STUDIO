import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="min-h-screen bg-alabaster flex items-center justify-center p-6 font-sans">
          <div className="max-w-lg">
            <h1 className="text-2xl font-bold text-charcoal-900 mb-4">Something went wrong</h1>
            <p className="text-stone-600 mb-4">{this.state.error.message}</p>
            <pre className="bg-stone-100 p-4 rounded-lg text-sm overflow-auto max-h-48 mb-6">
              {this.state.error.stack}
            </pre>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-lg bg-charcoal-900 text-white font-medium hover:bg-charcoal-800"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
