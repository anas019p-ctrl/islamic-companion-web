
/**
 * Gestore errori centralizzato per App Muslim
 */
export class AppError extends Error {
    constructor(message: string, public code: string = 'UNKNOWN_ERROR', public fatal: boolean = false) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = {
    log: (error: any, context: string = 'General') => {
        const timestamp = new Date().toISOString();
        const errorMessage = error instanceof Error ? error.message : String(error);
        const errorStack = error instanceof Error ? error.stack : '';

        console.error(`[${timestamp}] [${context}] Error: ${errorMessage}`, errorStack);

        // Possibile integrazione futura con Sentry o Discord
        if (import.meta.env.PROD) {
            // In produzione potremmo inviare i log a un servizio esterno
        }
    },

    handleFatal: (error: any) => {
        errorHandler.log(error, 'FATAL');
        // Logica per crash recovery o notifica critica
    }
};
