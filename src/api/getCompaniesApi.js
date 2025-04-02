import supabaseClient from "@/utils/supabase";

export async function getCompaniesApi(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) throw new Error(`Error getting companies: ${error.message}`);

  return data;
}
