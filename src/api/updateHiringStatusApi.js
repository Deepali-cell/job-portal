import supabaseClient from "@/utils/supabase";

export async function updateHiringStatusApi(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();
  if (error) {
    console.log(
      "there is some error on updating the hiring status of job",
      error
    );
    return null;
  }
  return data;
}
