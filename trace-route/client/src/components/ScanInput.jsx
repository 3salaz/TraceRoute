import { useEffect, useState } from "react";
import LatencyChart from "./LatencyChart";

export default function ScanInput() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [isValidIP, setIsValidIP] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  // IPv4 regex
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|[0-1]?\d\d?)\.(25[0-5]|2[0-4]\d|[0-1]?\d\d?)\.(25[0-5]|2[0-4]\d|[0-1]?\d\d?)\.(25[0-5]|2[0-4]\d|[0-1]?\d\d?)$/;

  // ---- Input Handler with Smart Formatting ----
  const handleIPInput = (e) => {
    let value = e.target.value;

    // Only digits and dots
    value = value.replace(/[^0-9.]/g, "");

    // Prevent double dots
    value = value.replace(/\.{2,}/g, ".");

    // Limit to 4 segments
    const segments = value.split(".");
    if (segments.length > 4) value = segments.slice(0, 4).join(".");

    // Auto-insert dots every 3 digits if possible
    if (!value.includes(".") && value.length > 3 && value.length < 12) {
      const auto = value.match(/.{1,3}/g);
      if (auto) value = auto.join(".");
    }

    setTarget(value);
    setIsValidIP(ipv4Regex.test(value));
  };

  // ---- Run Scan ----
  const handleRunScan = async () => {
    if (!isValidIP) {
      setError("Please enter a valid IPv4 address.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/api/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });

      const data = await res.json();
      setResult(data);
      saveToHistory({ target, timestamp: data.timestamp, result: data });
    } catch (err) {
      console.error(err);
      setError("An error occurred while running the scan.");
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (entry) => {
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("scanHistory", JSON.stringify(updated));
  };

  useEffect(() => {
    const stored = localStorage.getItem("scanHistory");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  const loadHistoryItem = (item) => {
    setTarget(item.target);
    setResult(item.result);
  };

  // ---- Render ----
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
        TraceRoute Scanner
      </h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={target}
          onChange={handleIPInput}
          placeholder="Enter IPv4 address (e.g. 192.168.1.1)"
          className={`border rounded-l px-3 py-2 w-full outline-none transition-colors ${
            target.length === 0
              ? "border-gray-300"
              : isValidIP
              ? "border-green-500 focus:ring-1 focus:ring-green-500"
              : "border-red-400 focus:ring-1 focus:ring-red-400"
          }`}
        />
        <button
          onClick={handleRunScan}
          disabled={!isValidIP || loading}
          className={`px-4 py-2 rounded-r text-white transition ${
            isValidIP
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Scanning..." : "Scan"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      {result && (
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <h3 className="font-bold mb-2">Results for {result.target}</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-1 px-2">Port</th>
                <th className="py-1 px-2">Service</th>
                <th className="py-1 px-2">Status</th>
                <th className="py-1 px-2">Latency (ms)</th>
              </tr>
            </thead>
            <tbody>
              {result.ports.map((p) => (
                <tr key={p.port} className="border-b">
                  <td className="py-1 px-2">{p.port}</td>
                  <td className="py-1 px-2">{p.service}</td>
                  <td
                    className={`py-1 px-2 font-semibold ${
                      p.status === "open" ? "text-green-700" : "text-red-600"
                    }`}
                  >
                    {p.status}
                  </td>
                  <td className="py-1 px-2">{p.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date(result.timestamp).toLocaleString()}
          </p>
          <LatencyChart ports={result.ports} />
        </div>
      )}

      {history.length > 0 && (
        <div className="bg-white p-4 rounded shadow-sm">
          <h4 className="font-semibold mb-2">Recent Scans</h4>
          <ul className="space-y-1">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded flex justify-between"
                onClick={() => loadHistoryItem(item)}
              >
                <span>{item.target}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}