// /api/[code].js
export default async function handler(req, res) {
  const { code } = req.query;

  // Supabase connection
  const { createClient } = require("@supabase/supabase-js");

  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_KEY
  );

  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("short_url", code)
    .single();

  if (data) {
    res.writeHead(302, { Location: data.original_url });
    res.end();
  } else {
    res.status(404).send("Not Found");
  }
}
