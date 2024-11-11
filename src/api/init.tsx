import { createClient } from "@supabase/supabase-js";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

const supabase = createClient(supabaseUrl, supabaseKey);

export const getAllTable = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select("*");

  return { data, error };
};
