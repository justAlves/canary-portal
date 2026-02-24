import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md">
        <div className="w-16 h-16 rounded-full border border-emerald-600/60 bg-emerald-900/20 flex items-center justify-center text-3xl">
          ⚔
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="font-title text-4xl text-amber-100">Bem-vindo!</h1>
          <p className="text-stone-400 leading-relaxed">
            Sua conta e personagem foram criados com sucesso. Abra o FlotationDeviceTibia, conecte ao servidor e comece sua jornada.
          </p>
        </div>

        <div className="border border-stone-700/60 bg-stone-900/60 p-6 w-full text-left flex flex-col gap-3">
          <p className="text-xs tracking-widest uppercase text-stone-500">Informações de conexão</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Servidor</span>
              <span className="text-amber-200 font-mono">http://72.60.157.197/login.php</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Porta</span>
              <span className="text-amber-200 font-mono">8081</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Versão</span>
              <span className="text-amber-200 font-mono">15.00</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="text-stone-500 text-xs tracking-widest uppercase hover:text-amber-600 transition-colors"
        >
          ← Voltar ao início
        </Link>
      </div>
    </main>
  );
}
