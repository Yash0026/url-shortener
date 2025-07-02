// api/[code].js

import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const {
    query: { code },
  } = req;

  // ✅ Tere Supabase credentials
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send("Supabase env vars missing");
  }

  // ✅ Supabase client bana
  const supabase = createClient(supabaseUrl, supabaseKey);

  // ✅ Short code se URL fetch kar
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('short_url', code)
    .single();

  if (error) {
    console.error(error);
    return res.status(500).send("DB Error: " + error.message);
  }

  if (!data) {
    return res.status(404).send("Not Found");
  }

  // ✅ Mil gaya toh redirect kar
  res.writeHead(302, { Location: data.original_url });
  res.end();
}
