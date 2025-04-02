import supabaseClient from "@/utils/supabase";

export async function deleteJobApi(token, { job_id }) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  if (error) {
    console.log("there is some error while deleting the job", error);
    return null;
  }
  return data;
}
