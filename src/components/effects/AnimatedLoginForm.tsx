import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AnimatedLoginFormProps {
    onLogin: (email: string, pass: string) => void;
    onForgotPassword: () => void;
    isLoading?: boolean;
    isAdmin?: boolean;
}

export const AnimatedLoginForm: React.FC<AnimatedLoginFormProps> = ({
    onLogin,
    onForgotPassword,
    isLoading = false,
    isAdmin = false
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [focused, setFocused] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md"
        >
            <div className="glass-premium p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="text-center mb-10 relative z-10">
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-[0_0_20px_rgba(201,164,74,0.2)]">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-gradient-gold mb-2">
                        {isAdmin ? 'Portale di amministrazione' : 'Benvenuto'}
                    </h2>
                    <p className="text-muted-foreground text-sm tracking-wide">
                        {isAdmin ? 'Accesso Area Riservata' : 'Accedi al tuo account personale'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-4">
                        <div className="relative group">
                            <motion.div
                                animate={{
                                    borderColor: focused === 'email' ? 'rgba(201, 164, 74, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                                    boxShadow: focused === 'email' ? '0 0 15px rgba(201, 164, 74, 0.2)' : 'none'
                                }}
                                className="relative rounded-2xl border transition-all duration-300 bg-background/50 overflow-hidden"
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    className="pl-12 h-14 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground text-base placeholder:text-muted-foreground/50"
                                    required
                                />
                            </motion.div>
                        </div>

                        <div className="relative group">
                            <motion.div
                                animate={{
                                    borderColor: focused === 'password' ? 'rgba(201, 164, 74, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                                    boxShadow: focused === 'password' ? '0 0 15px rgba(201, 164, 74, 0.2)' : 'none'
                                }}
                                className="relative rounded-2xl border transition-all duration-300 bg-background/50 overflow-hidden"
                            >
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused(null)}
                                    className="pl-12 h-14 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground text-base placeholder:text-muted-foreground/50"
                                    required
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onForgotPassword}
                            className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest underline decoration-primary/30 underline-offset-4"
                        >
                            Hai dimenticato la password?
                        </button>
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 rounded-2xl bg-gradient-to-r from-primary to-primary-foreground/10 text-primary-foreground font-bold text-lg shadow-lg hover:shadow-primary/20 transition-all group overflow-hidden relative"
                    >
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                    <span>Accesso in corso...</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="normal"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <span>ACCEDI ORA</span>
                                    <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center relative z-10">
                    <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-4">
                        Non hai un account?
                    </p>
                    <button className="flex items-center gap-2 mx-auto text-foreground font-bold hover:text-primary transition-colors group">
                        <span>CREA NUOVO ACCOUNT</span>
                        <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
