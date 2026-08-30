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

// Verify if admin user exists in Supabase
async function verifyAdmin(email: string | null) {
  if (!email) return false;
  const supabase = getSupabaseAdmin();
  const { data } = await supabase
    .from("admin_users")
    .select("id, email, role")
    .eq("email", email.trim().toLowerCase())
    .single();
  return !!data;
}

// GET: Fetch all messages for authenticated Supabase admin
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminEmail = searchParams.get("adminEmail");

    const isValid = await verifyAdmin(adminEmail);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Admin verification failed in Supabase." },
        { status: 401 }
      );
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

// DELETE: Delete a message by ID for authenticated Supabase admin
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const adminEmail = searchParams.get("adminEmail");
    const id = searchParams.get("id");

    const isValid = await verifyAdmin(adminEmail);
    if (!isValid) {
      return NextResponse.json(
        { error: "Unauthorized. Admin verification failed in Supabase." },
        { status: 401 }
      );
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
