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

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Query admin_users table in Supabase
    const { data: adminUser, error } = await supabase
      .from("admin_users")
      .select("id, full_name, email, role, password")
      .eq("email", email.trim().toLowerCase())
      .single();

    if (error || !adminUser) {
      return NextResponse.json(
        { error: "Invalid email or user not found in Supabase admin table." },
        { status: 401 }
      );
    }

    if (adminUser.password !== password) {
      return NextResponse.json(
        { error: "Incorrect password. Please verify your Supabase admin credentials." },
        { status: 401 }
      );
    }

    // Update last_login in Supabase
    await supabase
      .from("admin_users")
      .update({ last_login: new Date().toISOString() })
      .eq("id", adminUser.id);

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        name: adminUser.full_name,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (err: any) {
    console.error("Admin Login Error:", err);
    return NextResponse.json(
      { error: err?.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
