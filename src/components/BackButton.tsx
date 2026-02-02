import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

export const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Indietro</span>
        </Button>
    );
};
