import exporess from 'express';
const router = exporess.Router();

router.post("/", (req, res) => {
    const { target } = req.body;
    if (!target) {
        return res.status(400).json({ error: "Target is required" });
    }

    const ports = [22, 80, 443, 8089, 3000].map((port) => ({
        port: port,
        service:
            port === 22
                ? "ssh"
                : port === 80
                    ? "http"
                    : port === 443
                        ? "https"
                        : port === 8080
                            ? "proxy"
                            : "custom-app",
        status: Math.random() > 0.25 ? "open" : "closed",
        latency: Math.floor(Math.random() * 100),
    }));

    res.json({
        target,
        ports,
        timestamp: new Date().toISOString(),
    });
})

export default router;