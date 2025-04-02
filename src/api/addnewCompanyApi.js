import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function addnewCompanyApi(token, _, companyData) {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company_logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error("Storage Upload Error:", storageError);
    throw new Error(`Error storing company_logo: ${storageError.message}`);
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company_logo/${fileName}`;

  let { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select();

  if (error) {
    console.log("there is some error while adding the new company.", error);
    return null;
  }
  return data;
}
