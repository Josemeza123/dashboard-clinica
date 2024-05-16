import { conn } from "@/src/app/libs/mysql";
import { NextResponse } from "next/server";

// pidiendo un terapeuta por su id
export async function GET(request, { params }) {
  try {
    const result = await conn.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);
    if (result.length === 0)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// actualizando un terapeuta por su id
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const result = await conn.query("UPDATE terapeuta SET ? WHERE id = ?", [
      data,
      params.id,
    ]);
    if (result.affectedRows === 0)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    const updatedTerapeuta = await conn.query(
      "SELECT * FROM terapeuta WHERE id = ?",
      [params.id]
    );
    return NextResponse.json(updatedTerapeuta[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// eliminando un terapeuta por su id
export async function DELETE(request, { params }) {
  try {
    const result = await conn.query("DELETE FROM terapeuta WHERE id = ?", [
      params.id,
    ]);
    if (result.affectedRows === 0)
      return NextResponse.json(
        {
          message: "Product not found",
        },
        { status: 404 }
      );
    return new Response(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
