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
    const { name, descripcion, price } = await request.json();

    const result = await conn.query("INSERT INTO citas SET ?", {
      name,
      descripcion,
      price,
    });
    console.log(result);
    return NextResponse.json({ name, descripcion, price, id: result.insertId });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
