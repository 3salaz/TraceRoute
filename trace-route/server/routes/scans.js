import express from "express";
const router = express.Router();

// Common service/port map
const SERVICES = [
  { port: 22, service: "ssh" },
  { port: 25, service: "smtp" },
  { port: 53, service: "dns" },
  { port: 80, service: "http" },
  { port: 110, service: "pop3" },
  { port: 143, service: "imap" },
  { port: 443, service: "https" },
  { port: 3306, service: "mysql" },
  { port: 8080, service: "proxy" },
  { port: 6379, service: "redis" },
];

// Simple deterministic pseudo-random based on IP string
function seededRand(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return (min, max) => {
    h = Math.imul(48271, h) % 0x7fffffff;
    return min + (h % (max - min + 1));
  };
}

router.post("/", async (req, res) => {
  const { target } = req.body;
  if (!target) return res.status(400).json({ error: "No target provided" });

  const rand = seededRand(target);

  const ports = SERVICES.map(({ port, service }) => {
    const roll = rand(0, 100);
    let status;
    if (roll < 60) status = "closed";
    else if (roll < 90) status = "open";
    else status = "filtered";

    const latency =
      status === "filtered"
        ? rand(200, 800)
        : rand(5, 120);

    return { port, service, status, latency };
  });

  res.json({
    target,
    ports,
    timestamp: new Date().toISOString(),
  });
});

export default router;