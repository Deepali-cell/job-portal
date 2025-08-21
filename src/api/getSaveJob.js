import supabaseClient from "@/utils/supabase";

export async function getSaveJob(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("saved_jobs")
    .select("* , job:jobs(*, company:companies(name, logo_url))"); 

  if (error) {
    console.log("Error fetching saved jobs:", error);
    return null;
  }
  return data;
}
