"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<"account" | "character">("account");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accountId, setAccountId] = useState<number | null>(null);

  const [account, setAccount] = useState({ name: "", email: "", password: "", confirm: "" });
  const [character, setCharacter] = useState({ name: "", vocation: "1", sex: "1" });

  const vocations = [
    { id: "1", name: "Sorcerer", icon: "🔮" },
    { id: "2", name: "Druid", icon: "🌿" },
    { id: "3", name: "Paladin", icon: "🏹" },
    { id: "4", name: "Knight", icon: "⚔️" },
    { id: "9", name: "Monk", icon: "☯️" },
  ];

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (account.password !== account.confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (account.password.length < 4) {
      setError("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: account.name, email: account.email, password: account.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAccountId(data.accountId);
      setStep("character");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCharacter(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register/character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: character.name,
          vocation: parseInt(character.vocation),
          sex: parseInt(character.sex),
          accountId,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      router.push("/success");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao criar personagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link href="/" className="text-stone-500 text-xs tracking-widest uppercase hover:text-amber-600 transition-colors mb-2">
            ← Voltar
          </Link>
          <h1 className="font-title text-4xl text-amber-100">
            {step === "account" ? "Criar Conta" : "Criar Personagem"}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className={`flex items-center gap-2 text-xs ${step === "account" ? "text-amber-500" : "text-stone-500"}`}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${step === "account" ? "border-amber-500 text-amber-500" : "border-emerald-600 bg-emerald-900/40 text-emerald-500"}`}>
                {step === "account" ? "1" : "✓"}
              </div>
              Conta
            </div>
            <div className="w-8 h-px bg-stone-700" />
            <div className={`flex items-center gap-2 text-xs ${step === "character" ? "text-amber-500" : "text-stone-600"}`}>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${step === "character" ? "border-amber-500 text-amber-500" : "border-stone-700 text-stone-600"}`}>
                2
              </div>
              Personagem
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="border border-stone-700/60 bg-stone-900/80 p-8">
          {error && (
            <div className="mb-6 p-3 border border-red-800/60 bg-red-950/40 text-red-400 text-sm">
              {error}
            </div>
          )}

          {step === "account" ? (
            <form onSubmit={handleCreateAccount} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Nome da Conta</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={32}
                  value={account.name}
                  onChange={e => setAccount({ ...account, name: e.target.value })}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="seu_nome"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Email</label>
                <input
                  type="email"
                  required
                  value={account.email}
                  onChange={e => setAccount({ ...account, email: e.target.value })}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Senha</label>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={account.password}
                  onChange={e => setAccount({ ...account, password: e.target.value })}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Confirmar Senha</label>
                <input
                  type="password"
                  required
                  value={account.confirm}
                  onChange={e => setAccount({ ...account, confirm: e.target.value })}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-amber-800/80 hover:bg-amber-700/80 border border-amber-700/60 text-amber-100 py-3 text-sm tracking-widest uppercase font-title transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Criando..." : "Continuar →"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateCharacter} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Nome do Personagem</label>
                <input
                  type="text"
                  required
                  minLength={3}
                  maxLength={30}
                  value={character.name}
                  onChange={e => setCharacter({ ...character, name: e.target.value })}
                  className="bg-stone-800/60 border border-stone-700 text-stone-100 px-4 py-3 text-sm focus:outline-none focus:border-amber-700 transition-colors"
                  placeholder="Nome do herói"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Vocação</label>
                <div className="grid grid-cols-5 gap-2">
                  {vocations.map(v => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setCharacter({ ...character, vocation: v.id })}
                      className={`flex flex-col items-center gap-1 p-3 border transition-all duration-150 ${
                        character.vocation === v.id
                          ? "border-amber-600 bg-amber-900/30 text-amber-100"
                          : "border-stone-700 bg-stone-800/40 text-stone-400 hover:border-stone-600"
                      }`}
                    >
                      <span className="text-xl">{v.icon}</span>
                      <span className="text-xs">{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase text-stone-400">Sexo</label>
                <div className="grid grid-cols-2 gap-2">
                  {[{ id: "1", label: "Masculino", icon: "♂" }, { id: "0", label: "Feminino", icon: "♀" }].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCharacter({ ...character, sex: s.id })}
                      className={`flex items-center justify-center gap-2 py-3 border transition-all duration-150 text-sm ${
                        character.sex === s.id
                          ? "border-amber-600 bg-amber-900/30 text-amber-100"
                          : "border-stone-700 bg-stone-800/40 text-stone-400 hover:border-stone-600"
                      }`}
                    >
                      <span>{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-amber-800/80 hover:bg-amber-700/80 border border-amber-700/60 text-amber-100 py-3 text-sm tracking-widest uppercase font-title transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Criando..." : "Criar Personagem ⚔"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
