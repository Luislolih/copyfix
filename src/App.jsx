import { useEffect, useState } from "react";

export default function App() {
    const rawPath = window.location.pathname.slice(1);

    const textToCopy = rawPath ? decodeURIComponent(rawPath) : "";

    const hasText = textToCopy.trim() !== "";

    const [copied, setCopied] = useState(false);
    const [autoCopyFailed, setAutoCopyFailed] = useState(false);

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);

            setCopied(true);
            setAutoCopyFailed(false);

            setTimeout(() => {
                window.close();
            }, 300);
        } catch (error) {
            console.error("Copy failed:", error);

            setAutoCopyFailed(true);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (hasText) {
                copyText();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex min-h-screen flex-col bg-zinc-950 bg-grid-pattern text-zinc-100 selection:bg-red-500/30 selection:text-red-200 overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-red-600/15 blur-[120px] animate-float-1"
            />
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-rose-900/20 blur-[140px] animate-float-2"
            />
            <div 
                aria-hidden="true" 
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-red-500/5 blur-[160px]"
            />

            {/* Navbar Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-6">
                    <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-rose-600/10 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5 text-red-500"
                            >
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-extrabold tracking-wider text-white">
                                    COPYFIX
                                </h1>
                                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-widest text-red-400 border border-red-500/20">
                                    PRO
                                </span>
                            </div>
                            <p className="text-[11px] font-medium tracking-wide text-zinc-400">
                                Secure Clipboard Utility
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
                <div className="w-full max-w-lg glass-card glass-card-glow rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-300">
                    {!hasText ? (
                        /* Empty State */
                        <div className="text-center animate-scale-in">
                            <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent border border-red-500/30 shadow-[0_0_25px_rgba(239,68,68,0.2)]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.75"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-10 w-10 text-red-500"
                                >
                                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                No hay texto ingresado
                            </h2>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                La URL no contiene ningún parámetro o fragmento de texto válido para copiar al portapapeles.
                            </p>

                            <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/60 p-4 text-left backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                                    <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Ejemplo de uso correcto:
                                </div>
                                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2.5 font-mono text-xs text-zinc-300 break-all flex items-center justify-between">
                                    <span>
                                        tusitio.com/<span className="font-semibold text-red-400">netflix123</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Has Text State */
                        <div className="animate-scale-in">
                            {/* Card Top Label */}
                            <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                                        Texto Detectado
                                    </span>
                                </div>
                                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-zinc-400">
                                    {textToCopy.length} caracteres
                                </span>
                            </div>

                            {/* Detected Text Box */}
                            <div className="group relative mb-6 rounded-2xl border border-zinc-700/60 bg-zinc-950/90 p-5 shadow-inner transition-all duration-300 hover:border-red-500/40">
                                <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-wider text-zinc-600 group-hover:text-red-400/80 transition-colors">
                                    CLIPBOARD BUFFER
                                </div>
                                <p className="break-all font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl select-all pt-2">
                                    {textToCopy}
                                </p>
                            </div>

                            {/* Success Alert */}
                            {copied && (
                                <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/50 p-4 text-center shadow-[0_0_25px_rgba(16,185,129,0.15)] animate-scale-in">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                            ✓
                                        </div>
                                        <p className="text-base font-bold text-emerald-400">
                                            Texto copiado correctamente
                                        </p>
                                    </div>
                                    <p className="mt-1.5 text-xs text-zinc-400 flex items-center justify-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                                        Cerrando pestaña automáticamente...
                                    </p>
                                </div>
                            )}

                            {/* Warning / Manual Action Required Alert */}
                            {!copied && autoCopyFailed && (
                                <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-950/50 p-4 text-center shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-scale-in">
                                    <p className="text-sm font-semibold text-amber-300 flex items-center justify-center gap-2">
                                        <span>⚠️</span> El navegador bloqueó la copia automática
                                    </p>
                                    <p className="mt-1 text-xs text-zinc-400">
                                        Haz clic en el botón a continuación para copiar manualmente.
                                    </p>
                                </div>
                            )}

                            {/* Action Button */}
                            {!copied && (
                                <button
                                    onClick={copyText}
                                    className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 p-[1px] shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] active:scale-[0.98]"
                                >
                                    <div className="relative flex items-center justify-center gap-3 rounded-[15px] bg-zinc-950/40 px-6 py-4 transition-all duration-300 group-hover:bg-transparent">
                                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                                        
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-5 w-5 text-white transition-transform duration-300 group-hover:scale-110"
                                        >
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        
                                        <span className="text-lg font-bold tracking-wide text-white">
                                            Copiar texto
                                        </span>
                                    </div>
                                </button>
                            )}

                            {/* Current URL indicator */}
                            <div className="mt-6 border-t border-white/5 pt-4 text-center">
                                <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                                    URL de Origen
                                </p>
                                <p className="mt-1 break-all font-mono text-xs text-zinc-400 bg-white/5 rounded-lg py-1.5 px-3 border border-white/5">
                                    {window.location.href}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 bg-zinc-950/80 px-6 py-6 text-center backdrop-blur-xl">
                <div className="mx-auto max-w-2xl text-xs text-zinc-500 leading-relaxed">
                    <p className="flex items-center justify-center gap-1.5 mb-1 text-zinc-400 font-medium">
                        <svg className="w-4 h-4 text-red-500 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        Desarrollado para el uso interno de{" "}
                        <a
                            href="https://wa.me/51920533426"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Contactar al equipo de CuevaFlix"
                            className="font-bold text-red-500 transition-colors hover:text-red-400 hover:underline"
                        >
                            CuevaFlix
                        </a>
                    </p>
                    <p className="text-[11px] text-zinc-600">
                        Procesamiento directo e instantáneo en el navegador del usuario sin almacenamiento en servidor.
                    </p>
                </div>
            </footer>
        </div>
    );
}
