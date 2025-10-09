import express from "express";
import cors from "cors";
import scansRouter from "./routes/scans.js";

const app = express();

// Allow your Codespace URL + production frontend
const allowedOrigins = [
  "https://trace-route-seven.vercel.app",
  "https://super-carnival-pp7vxj4rqqw397wr-5174.app.github.dev", // your Codespace origin
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.get("/api/health", (req, res) => res.json({ status: "Server is healthy" }));
app.use("/api/scan", scansRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);