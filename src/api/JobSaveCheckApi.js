import supabaseClient from "@/utils/supabase";

export async function JobSaveCheckApi(token, options, saveData) {
  if (!saveData || !saveData.user_id || !saveData.job_id) {
    console.error("Invalid parameters passed to JobSaveCheckApi:", saveData);
    return null;
  }

  try {
    const supabase = await supabaseClient(token);

    const { data: existingData, error: checkError } = await supabase
      .from("saved_jobs")
      .select("*")
      .eq("user_id", saveData.user_id)
      .eq("job_id", saveData.job_id);

    if (checkError)
      throw new Error(`Error checking saved job: ${checkError.message}`);

    if (existingData.length > 0) {
      const { data, error: deleteError } = await supabase
        .from("saved_jobs")
        .delete()
        .eq("job_id", saveData.job_id)
        .eq("user_id", saveData.user_id);

      if (deleteError)
        throw new Error(`Error removing saved job: ${deleteError.message}`);

      return data;
    } else {
      const { data, error: insertError } = await supabase
        .from("saved_jobs")
        .insert([{ user_id: saveData.user_id, job_id: saveData.job_id }])
        .select();

      if (insertError)
        throw new Error(`Error saving job: ${insertError.message}`);

      return data;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
