import supabaseClient from "@/utils/supabase";

export async function candidateJobStatusApi(token, { job_id }, status) {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();
  if (error || data.length === 0) {
    console.log(
      "there is some error on updating the candidate job status",
      error
    );
    return null;
  }
  return data;
}
