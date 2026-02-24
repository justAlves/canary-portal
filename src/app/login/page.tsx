import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h1 className="font-title text-4xl text-amber-100">Área do Jogador</h1>
        <p className="text-stone-400">Em breve — por enquanto crie sua conta e conecte direto pelo FlotationDeviceTibia.</p>
        <Link href="/" className="text-stone-500 text-xs tracking-widest uppercase hover:text-amber-600 transition-colors">
          ← Voltar
        </Link>
      </div>
    </main>
  );
}
