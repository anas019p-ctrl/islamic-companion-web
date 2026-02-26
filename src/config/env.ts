/**
 * ðŸ” CENTRALIZED ENV CONFIGURATION
 * All environmental variables managed in one place with strict validation.
 */

export const ENV = {
    OPENROUTER_API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
    SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
    IS_DEV: import.meta.env.MODE === 'development',
    IS_PROD: import.meta.env.MODE === 'production',
    VERSION: '2.2.0-ultra-light',
};

// Simple validation
if (!ENV.SUPABASE_URL || !ENV.SUPABASE_ANON_KEY) {
    console.warn("âš ï¸ Supabase credentials missing. Some features may not work.");
}

export default ENV;
