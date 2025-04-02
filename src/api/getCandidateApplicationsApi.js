import supabaseClient from "@/utils/supabase";

export async function getCandidateApplicationsApi(token, { user_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("applications")
    .select("* , job:jobs(*, company:companies(name, logo_url))")
    .eq("candidate_id", user_id);

  if (error) {
    console.log(
      "there is some error on fetching application of the candidate",
      error
    );
    return null;
  }
  return data;
}
