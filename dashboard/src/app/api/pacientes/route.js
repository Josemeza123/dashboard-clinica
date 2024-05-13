import { NextResponse } from "next/server";
import { conn } from "../../libs/mysql";

export async function GET() {
  try {
    const result = await conn.query("SELECT * FROM paciente");
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      dni,
      nombre,
      edad,
      estado_civil,
      ocupacion,
      peso,
      fecha_nacimiento,
      talla,
      direccion,
      referencia,
      celular,
    } = await request.json();
    const result = await conn.query("INSERT INTO paciente SET ?", {
      dni,
      nombre,
      edad,
      estado_civil,
      ocupacion,
      peso,
      fecha_nacimiento,
      talla,
      direccion,
      referencia,
      celular,
    });
    console.log(result);
    return NextResponse.json({
      dni,
      nombre,
      edad,
      estado_civil,
      ocupacion,
      peso,
      fecha_nacimiento,
      talla,
      direccion,
      referencia,
      celular,
      id: result.insertId,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
