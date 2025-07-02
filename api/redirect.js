export default function handler(req, res) {
  const { code } = req.query;

  const redirects = {
    abc123: "https://google.com",
    xyz789: "https://github.com",
    icgg: "https://openai.com"
  };

  const destination = redirects[code];

  if (destination) {
    res.writeHead(302, { Location: destination });
    res.end();
  } else {
    res.status(404).send("Not Found");
  }
}
