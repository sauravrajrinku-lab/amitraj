import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const getSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  return createClient(supabaseUrl, supabaseKey);
};

// GET: Fetch all messages
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pass = searchParams.get("key");
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (pass !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, messages: data || [] });
  } catch (err: any) {
    console.error("Admin API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE: Delete a message by ID
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pass = searchParams.get("key");
    const id = searchParams.get("id");
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (pass !== adminPassword) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Message deleted successfully." });
  } catch (err: any) {
    console.error("Admin Delete error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
