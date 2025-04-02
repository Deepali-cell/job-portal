import supabaseClient from "@/utils/supabase";

export async function postJobApi(token, _, jobData) {
  const supabase = await supabaseClient(token);
  let { data, error } = await supabase.from("jobs").insert([jobData]).select();
  if (error) {
    console.log("there is some error while posting the job.", error);
    return null;
  }
  return data;
}
