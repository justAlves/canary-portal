import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Vocation defaults based on Canary schema samples
const VOCATION_DEFAULTS: Record<number, { health: number; mana: number; cap: number; maglevel: number }> = {
  0: { health: 155, mana: 60,  cap: 410, maglevel: 2  }, // Rook
  1: { health: 185, mana: 90,  cap: 470, maglevel: 0  }, // Sorcerer
  2: { health: 185, mana: 90,  cap: 470, maglevel: 0  }, // Druid
  3: { health: 185, mana: 90,  cap: 470, maglevel: 0  }, // Paladin
  4: { health: 185, mana: 90,  cap: 470, maglevel: 0  }, // Knight
  9: { health: 185, mana: 90,  cap: 470, maglevel: 0  }, // Monk
};

// Thais spawn position
const SPAWN = { town_id: 8, posx: 32369, posy: 32241, posz: 7 };

export async function POST(req: NextRequest) {
  try {
    const { name, vocation, sex, accountId } = await req.json();

    if (!name || vocation === undefined || sex === undefined || !accountId) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    if (name.length < 3 || name.length > 30) {
      return NextResponse.json({ error: "Nome deve ter entre 3 e 30 caracteres." }, { status: 400 });
    }

    if (!/^[a-zA-Z ]+$/.test(name)) {
      return NextResponse.json({ error: "Nome só pode conter letras e espaços." }, { status: 400 });
    }

    const validVocations = [0, 1, 2, 3, 4, 9];
    if (!validVocations.includes(vocation)) {
      return NextResponse.json({ error: "Vocação inválida." }, { status: 400 });
    }

    const defaults = VOCATION_DEFAULTS[vocation] ?? VOCATION_DEFAULTS[1];
    const looktype = sex === 1 ? 128 : 136;

    await db.execute(
      `INSERT INTO players 
        (name, account_id, vocation, level, health, healthmax, mana, manamax, 
         cap, sex, town_id, posx, posy, posz, looktype, conditions,
         maglevel, experience, soul, stamina)
       VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '', ?, 0, 100, 2520)`,
      [
        name, accountId, vocation,
        defaults.health, defaults.health,
        defaults.mana, defaults.mana,
        defaults.cap, sex,
        SPAWN.town_id, SPAWN.posx, SPAWN.posy, SPAWN.posz,
        looktype, defaults.maglevel,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Este nome de personagem já está em uso." }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Erro interno ao criar personagem." }, { status: 500 });
  }
}
