import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyResumeApi(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume, { contentType: jobData.resume.type });

  if (storageError) {
    console.error("Storage Upload Error:", storageError);
    throw new Error(`Error storing resume: ${storageError.message}`);
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  if (!jobData.candidate_id || !jobData.job_id) {
    throw new Error("Candidate ID or Job ID is missing");
  }

  const { data, error: applicationError } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select(); // Ensure inserted data is returned

  if (applicationError) {
    console.error("Database Insertion Error:", applicationError);
    throw new Error(`Error creating application: ${applicationError.message}`);
  }

  console.log("Insertion Response:", data);
  return data;
}
