import supabaseClient from "@/utils/supabase";

export async function getSingleJobApi(token, { job_id }) {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase
    .from("jobs")
    .select(
      "* , company : companies(name , logo_url) , applications : applications(*)"
    )
    .eq("id", job_id)
    .single();
  if (error) {
    console.log("there is some error on fetching all jobs", error);
    return null;
  }
  return data;
}
