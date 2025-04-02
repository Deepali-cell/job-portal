import supabaseClient from "@/utils/supabase";

export async function getRecruiterPostJobsApi(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .select("* ,company:companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.log("there is some error on fetching recruiter post jobs", error);
    return null;
  }
  return data;
}
