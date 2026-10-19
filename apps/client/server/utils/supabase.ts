import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key && url.startsWith("http")) {
    try {
      supabaseInstance = createClient(url, key);
      return supabaseInstance;
    } catch (e) {
      console.warn("Failed to initialize Supabase client:", e);
    }
  }

  return null;
}

export async function saveProgressToSupabase(
  userId: string,
  coursePackId: string,
  courseId: string,
  statementIndex: number,
) {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("course_progress").upsert(
      {
        user_id: userId,
        course_pack_id: coursePackId,
        course_id: courseId,
        statement_index: statementIndex,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_pack_id,course_id" },
    );
    if (error) console.warn("Supabase upsert progress error:", error.message);
    return !error;
  } catch (err) {
    console.warn("Supabase save progress exception:", err);
    return false;
  }
}

export async function saveCompletionToSupabase(
  userId: string,
  coursePackId: string,
  courseId: string,
) {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { data } = await client
      .from("course_history")
      .select("completion_count")
      .eq("user_id", userId)
      .eq("course_pack_id", coursePackId)
      .eq("course_id", courseId)
      .single();

    const count = (data?.completion_count || 0) + 1;

    const { error } = await client.from("course_history").upsert(
      {
        user_id: userId,
        course_pack_id: coursePackId,
        course_id: courseId,
        completion_count: count,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_pack_id,course_id" },
    );

    if (error) console.warn("Supabase completion history error:", error.message);
    return !error;
  } catch (err) {
    console.warn("Supabase save completion exception:", err);
    return false;
  }
}

export async function saveMasteredElementToSupabase(
  userId: string,
  elementId: string,
  english: string,
  arabic?: string,
) {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from("mastered_elements").upsert({
      id: elementId,
      user_id: userId,
      english,
      arabic: arabic || "",
      mastered_at: new Date().toISOString(),
    });
    if (error) console.warn("Supabase mastered elements error:", error.message);
    return !error;
  } catch (err) {
    console.warn("Supabase save mastered exception:", err);
    return false;
  }
}

export async function removeMasteredElementFromSupabase(userId: string, elementId: string) {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client
      .from("mastered_elements")
      .delete()
      .eq("id", elementId);
    return !error;
  } catch (err) {
    console.warn("Supabase delete mastered exception:", err);
    return false;
  }
}

export async function saveLearningActivityToSupabase(
  userId: string,
  duration: number,
  date?: string,
) {
  const client = getSupabaseClient();
  if (!client) return false;

  const activityDate = date || new Date().toISOString().split("T")[0];

  try {
    const { data } = await client
      .from("learning_activities")
      .select("duration")
      .eq("user_id", userId)
      .eq("activity_date", activityDate)
      .single();

    const totalDuration = (data?.duration || 0) + duration;

    const { error } = await client.from("learning_activities").upsert(
      {
        user_id: userId,
        activity_date: activityDate,
        duration: totalDuration,
      },
      { onConflict: "user_id,activity_date" },
    );
    return !error;
  } catch (err) {
    console.warn("Supabase activity exception:", err);
    return false;
  }
}
