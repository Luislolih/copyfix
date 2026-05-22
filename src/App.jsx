import { useEffect, useState } from "react";

export default function App() {
    const rawPath = window.location.pathname.slice(1);

    const textToCopy = rawPath ? decodeURIComponent(rawPath) : "";

    const hasText = textToCopy.trim() !== "";

    const [copied, setCopied] = useState(false);
    const [autoCopyFailed, setAutoCopyFailed] = useState(false);

    const closeWindow = () => {
        setTimeout(() => {
            window.close();
        }, 10000);
    };

    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(textToCopy);

            setCopied(true);
            setAutoCopyFailed(false);

            closeWindow();
        } catch (error) {
            console.error("Copy failed:", error);

            setAutoCopyFailed(true);
        }
    };

    useEffect(() => {
        if (hasText) {
            copyText();
        }
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-white">
            <nav className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 items-center justify-center px-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 ring-1 ring-red-500/20">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5 text-red-500"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                />
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                        </div>

                        <div className="text-center">
                            <h1 className="text-lg font-bold tracking-wide text-white">
                                COPYFIX APP
                            </h1>

                            <p className="text-xs text-zinc-500">
                                Secure Clipboard Utility
                            </p>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="flex flex-1 items-center justify-center px-4 py-10">
                <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                    {!hasText ? (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-8 w-8 text-red-500"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                            </div>

                            <h1 className="text-2xl font-bold text-white">
                                No hay texto ingresado
                            </h1>

                            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                La URL no contiene ningún texto válido para
                                copiar.
                            </p>

                            <p className="mt-6 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-xs text-zinc-500">
                                Ejemplo válido:
                                <br />
                                <span className="text-red-400">
                                    tusitio.com/netflix123
                                </span>
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6 text-center">
                                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
                                    Texto detectado
                                </p>

                                <h1 className="break-all text-3xl font-bold text-white">
                                    {textToCopy}
                                </h1>
                            </div>

                            {copied && (
                                <div className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-center">
                                    <p className="text-lg font-semibold text-green-400">
                                        ✅ Texto copiado correctamente
                                    </p>

                                    <p className="mt-2 text-sm text-zinc-400">
                                        Esta pestaña intentará cerrarse
                                        automáticamente.
                                    </p>
                                </div>
                            )}

                            {!copied && autoCopyFailed && (
                                <div className="mb-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-center">
                                    <p className="text-sm text-yellow-300">
                                        El navegador bloqueó la copia
                                        automática.
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-400">
                                        Presiona el botón para copiar
                                        manualmente.
                                    </p>
                                </div>
                            )}

                            {!copied && (
                                <button
                                    onClick={copyText}
                                    className="w-full rounded-2xl bg-red-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-red-600"
                                >
                                    📋 Copiar texto
                                </button>
                            )}

                            <p className="mt-6 text-center text-sm text-zinc-500">
                                URL actual:
                            </p>

                            <p className="mt-1 break-all text-center text-xs text-zinc-400">
                                {window.location.href}
                            </p>
                        </>
                    )}
                </div>
            </main>

            <footer className="border-t border-zinc-800 px-6 py-6 text-center text-sm text-zinc-500">
                <p className="mx-auto max-w-2xl leading-relaxed">
                    Esta herramienta fue desarrollada para el uso interno de{" "}
                    <a
                        href="https://wa.me/51920533426"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Contactar al equipo de CFIX Manager"
                        className="font-semibold text-red-500 transition-colors hover:text-red-400"
                    >
                        CFIX Manager
                    </a>
                    . Los datos copiados no se almacenan ni se procesan en
                    servidores, ya que son obtenidos directamente desde la URL
                    utilizada.
                </p>
            </footer>
        </div>
    );
}
