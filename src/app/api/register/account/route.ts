import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import crypto from "crypto";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  try {
    const { name, password, email } = await req.json();

    if (!name || !password || !email) {
      return NextResponse.json({ error: "Nome, senha e email são obrigatórios." }, { status: 400 });
    }

    if (name.length < 3 || name.length > 32) {
      return NextResponse.json({ error: "Nome deve ter entre 3 e 32 caracteres." }, { status: 400 });
    }

    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return NextResponse.json({ error: "Nome só pode conter letras, números e underscores." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }

    // SHA1 hash like Canary expects
    const hashedPassword = crypto.createHash("sha1").update(password).digest("hex");

    const [result] = await db.execute(
      "INSERT INTO accounts (name, password, email, type, creation) VALUES (?, ?, ?, 1, UNIX_TIMESTAMP())",
      [name, hashedPassword, email]
    ) as mysql.ResultSetHeader[];

    return NextResponse.json({ accountId: result.insertId });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Este nome de conta já está em uso." }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Erro interno ao criar conta." }, { status: 500 });
  }
}
