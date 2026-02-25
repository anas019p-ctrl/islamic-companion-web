import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Gamepad2 } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

export class EducationalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Educational Error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-purple-500/5 rounded-3xl border-2 border-dashed border-purple-500/20">
                    <div className="text-6xl mb-4 text-purple-500">
                        <Gamepad2 className="w-16 h-16 inline-block mb-4" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Ops! Un piccolo intoppo...
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                        Stiamo sistemando questa lezione. Nel frattempo, che ne dici di fare un ripasso di quelle giÃ  aperte o leggere una bella storia?
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            onClick={() => this.setState({ hasError: false })}
                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                        >
                            <RefreshCcw className="w-5 h-5 mr-2" />
                            Riprova ora
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default EducationalErrorBoundary;
