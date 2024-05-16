import { conn } from "@/src/app/libs/mysql";
import { NextResponse } from "next/server";

// pidiendo un cita por su id
export async function GET({ params }) {
  try {
    const result = await conn.query("SELECT * FROM citas WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0) {
      return NextResponse.json({ message: "Cita Not found" }, { status: 404 });
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// actualizando un cita por su id
export async function PUT({ params, request }) {
  try {
    const data = await request.json();

    const result = await conn.query("UPDATE citas SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Cita Not found" }, { status: 404 });
    }
    const updatedCitas = await conn.query("SELECT * FROM citas WHERE id = ?", [
      params.id,
    ]);

    return NextResponse.json(updatedCitas[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// eliminando un cita por su id
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM citas WHERE id = ?", [
      params.id,
    ]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Cita Not found" }, { status: 404 });
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
