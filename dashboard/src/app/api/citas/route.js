import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const result = await conn.query("SELECT * FROM citas");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      id_terapeuta,
      id_paciente,
      fecha_atencion,
      tratamiento,
      observacion,
    } = await request.json();

    const result = await conn.query("INSERT INTO citas SET ?", {
      id_terapeuta,
      id_paciente,
      fecha_atencion,
      tratamiento,
      observacion,
    });
    console.log(result);
    return NextResponse.json({
      id_terapeuta,
      id_paciente,
      fecha_atencion,
      tratamiento,
      observacion,
      id: result.insertId,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
