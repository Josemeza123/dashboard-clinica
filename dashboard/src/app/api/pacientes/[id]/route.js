import { conn } from "@/src/app/libs/mysql";
import { NextResponse } from "next/server";

// pidiendo un paciente por su id
export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM paciente WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json(
        { message: "Paciente Not Found" },
        { status: 404 }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// actualizando un paciente por su id
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE paciente SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Paciente Not Found" },
        { status: 404 }
      );
    }
    const updatedPaciente = await conn.query(
      "SELECT * FROM paciente WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(updatedPaciente[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// eliminando un paciente por su id
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM paciente WHERE id = ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Paciente Not Found" },
        { status: 404 }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
