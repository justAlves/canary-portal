import Link from "next/link";
import DownloadButton from "@/components/DownloadButton";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-10 px-4">
        {/* Logo / Title */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-amber-600/60" />
            <span className="text-amber-600/60 text-xs tracking-[0.4em] uppercase font-light">Est. 2026</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-amber-600/60" />
          </div>
          <h1 className="font-title text-6xl md:text-8xl text-amber-100 tracking-tight leading-none">
            Flotation Device
          </h1>
          <p className="text-stone-400 text-sm tracking-[0.3em] uppercase">A Open Tibia Server</p>
        </div>

        {/* Divider ornament */}
        <div className="flex items-center gap-4">
          <div className="w-24 h-px bg-gradient-to-r from-transparent to-amber-700/50" />
          <div className="w-2 h-2 rotate-45 bg-amber-700/50" />
          <div className="w-24 h-px bg-gradient-to-l from-transparent to-amber-700/50" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
          <Link href="/register" className="group">
            <div className="h-full border border-stone-700/60 bg-stone-900/80 hover:bg-stone-800/80 hover:border-amber-700/60 transition-all duration-300 p-8 flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-amber-600 text-2xl">⚔</div>
              <h2 className="font-title text-2xl text-amber-100">Criar Conta</h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Registre-se e comece sua jornada em Tibia.
              </p>
              <span className="text-amber-600/60 text-xs tracking-widest uppercase mt-2 group-hover:text-amber-500 transition-colors">
                Começar →
              </span>
            </div>
          </Link>

          <Link href="/login" className="group">
            <div className="h-full border border-stone-700/60 bg-stone-900/80 hover:bg-stone-800/80 hover:border-amber-700/60 transition-all duration-300 p-8 flex flex-col gap-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-amber-600 text-2xl">🏰</div>
              <h2 className="font-title text-2xl text-amber-100">Entrar</h2>
              <p className="text-stone-400 text-sm leading-relaxed">
                Acesse sua conta e gerencie seus personagens.
              </p>
              <span className="text-amber-600/60 text-xs tracking-widest uppercase mt-2 group-hover:text-amber-500 transition-colors">
                Acessar →
              </span>
            </div>
          </Link>

          <DownloadButton />
        </div>

        {/* Server info */}
        <div className="flex items-center gap-6 text-xs text-stone-500 tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Servidor Online</span>
          </div>
          <div className="w-px h-4 bg-stone-700" />
          <span>Protocolo 15.00</span>
          <div className="w-px h-4 bg-stone-700" />
          <span>PvP</span>
        </div>
      </div>
    </main>
  );
}
