import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-white p-8 font-mono overflow-auto">
                    <h1 className="text-2xl text-red-500 font-bold mb-4">Something went wrong.</h1>
                    <div className="bg-gray-900 p-4 rounded border border-gray-800 mb-4">
                        <h2 className="text-lg font-bold mb-2">Error:</h2>
                        <pre className="whitespace-pre-wrap text-red-400">
                            {this.state.error && this.state.error.toString()}
                        </pre>
                    </div>
                    <div className="bg-gray-900 p-4 rounded border border-gray-800">
                        <h2 className="text-lg font-bold mb-2">Stack Trace:</h2>
                        <pre className="whitespace-pre-wrap text-gray-400 text-sm">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
