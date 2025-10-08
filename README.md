# 🛰️ TraceRoute — Developer Network Utility Dashboard

**TraceRoute** is a lightweight developer utility that simulates network scanning and port visualization.  
Built with **React + Vite + TailwindCSS** (frontend) and **Express.js** (backend), it demonstrates full-stack integration, UI visualization, and mock DevOps tooling — ideal for portfolio and interview showcases.

---

## 🚀 Features
- 🔍 Input IP or domain → get mock scan data
- 📊 Visualize open/closed ports + latency chart
- 🧠 Deterministic API mock logic (same IP = same result)
- 💾 Local scan history saved to browser
- 🧱 Responsive dashboard layout
- 🌗 Dark mode support via Tailwind

---

## 🧩 Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React (Vite) + TailwindCSS + Chart.js |
| Backend | Node.js + Express |
| Mock Data | Deterministic pseudo-random generator |
| Storage | Browser LocalStorage |
| Hosting | Compatible with Render, Vercel, or Codespaces |

---

## 🧰 Setup Instructions

### Clone the Repo
```bash
git clone https://github.com/<your-username>/TraceRoute.git
cd TraceRoute
```

### Start the Server
```bash
cd trace-route/server
npm install
npm run dev
```
Server will start at [http://localhost:5000](http://localhost:5000)

### Start the Client
In a new terminal:
```bash
cd trace-route/client
npm install
npm run dev
```
Vite will start the app (usually on port `5173`).

---

## 🧪 API Documentation

### `POST /api/scan`

**Description:**  
Simulates a network scan with deterministic mock data.

**Request Body**
```json
{
  "target": "192.168.1.1"
}
```

**Response**
```json
{
  "target": "192.168.1.1",
  "ports": [
    { "port": 22, "service": "ssh", "status": "closed", "latency": 43 },
    { "port": 80, "service": "http", "status": "open", "latency": 87 },
    { "port": 443, "service": "https", "status": "filtered", "latency": 412 }
  ],
  "timestamp": "2025-10-08T18:45:00.000Z"
}
```

**Statuses**
| Status | Description |
|---------|-------------|
| `open` | Service is available and responding |
| `closed` | Port is closed or unreachable |
| `filtered` | Packet filtered or timed out |

---

## 🖼️ Screenshots

| View | Preview |
|------|----------|
| Dashboard | ![Dashboard Screenshot](docs/screens/dashboard.png) |
| Scan Results | ![Scan Results](docs/screens/scan-results.png) |
| Latency Chart | ![Latency Chart](docs/screens/chart.png) |

> 📸 Place your screenshots in `docs/screens/` (you can take them directly in Codespaces or local dev).

---

## 🧭 Project Structure
```
trace-route/
├── client/                  # React + Tailwind frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/      # DashboardLayout, Sidebar, Header
│   │   │   ├── ScanInput.jsx
│   │   │   ├── LatencyChart.jsx
│   │   │   └── ...
│   └── ...
└── server/                  # Express backend
    ├── routes/
    │   └── scans.js         # Mock scan logic
    └── server.js
```

---

## 🧠 Developer Notes
- **Codespaces Ready:** Runs instantly in GitHub Codespaces.  
- **Mock Layer:** Deterministic randomness ensures stable testing for portfolio demos.  
- **Extendable:** Add real `nmap` CLI or WebSocket streaming later without breaking structure.

---

## 📜 License
MIT © 2025 [Your Name]

---

## 🧭 Future Roadmap
- [ ] Add real-time WebSocket updates  
- [ ] Add ping traceroute simulation  
- [ ] Deploy demo via Render / Vercel  
- [ ] Add unit tests for mock generator
