"use client";
import { useState } from "react";

const CLIENT_URL = "https://pub-d617d3cf14b34a40bb08af35c16dda0d.r2.dev/Client.zip";
const FILE_NAME = "FlotationDeviceTibia.zip";

export default function DownloadButton() {
  const [progress, setProgress] = useState<number | null>(null);

  async function handleDownload() {
    setProgress(0);
    try {
      const res = await fetch(CLIENT_URL);
      const contentLength = res.headers.get("Content-Length");
      const total = contentLength ? parseInt(contentLength) : null;
      const reader = res.body!.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        if (total) setProgress(Math.round((received / total) * 100));
      }

      const blob = new Blob(chunks, { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = FILE_NAME;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setProgress(null);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={progress !== null}
      className="group border border-stone-700/60 bg-stone-900/80 hover:bg-stone-800/80 hover:border-amber-700/60 transition-all duration-300 p-8 flex flex-col gap-3 relative overflow-hidden w-full text-left disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="text-amber-600 text-2xl">⬇</div>
      <h2 className="font-title text-2xl text-amber-100">Baixar Cliente</h2>
      <p className="text-stone-400 text-sm leading-relaxed">
        Faça o download do cliente para jogar.
      </p>
      <span className="text-amber-600/60 text-xs tracking-widest uppercase mt-2 group-hover:text-amber-500 transition-colors">
        {progress !== null ? `Baixando... ${progress}%` : "Download →"}
      </span>
      {progress !== null && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-amber-600/60 transition-all duration-200" style={{ width: `${progress}%` }} />
      )}
    </button>
  );
}
