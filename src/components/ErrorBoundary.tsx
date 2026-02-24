import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
                    <div className="max-w-md w-full bg-destructive/10 border border-destructive/20 rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>
                        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
                        <p className="text-muted-foreground mb-4 text-sm">
                            The application encountered an unexpected error.
                        </p>
                        <div className="bg-black/10 p-4 rounded-xl text-left overflow-auto max-h-40 mb-6">
                            <code className="text-xs font-mono text-destructive">
                                {this.state.error?.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 rounded-xl bg-destructive text-destructive-foreground font-bold hover:opacity-90 transition-opacity"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
