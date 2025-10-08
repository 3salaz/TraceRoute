import React, { useEffect, useState } from 'react'
import LatencyChart from './LatencyChart';

export default function ScanInput() {

    const [target, setTarget] = useState("");
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);


    const saveToHistory = (entry) => {
        const updated = [entry, ...history].slice(0, 10); // keep last 10
        setHistory(updated);
        localStorage.setItem("scanHistory", JSON.stringify(updated));
    };

    const handleRunScan = async () => {
        if (!target.trim()) return;
        setLoading(true);

        try {
            const res = await fetch("/api/scan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ target }),
            });

            const data = await res.json();

            setResult(data);
            saveToHistory({ target, timestamp: data.timestamp, result: data });
        } catch (err) {
            setError("An error occurred while running the scan.");
            console.error(err);
        } finally {
            setLoading(false);
        }

    }


    useEffect(() => {
        const stored = localStorage.getItem("scanHistory");
        if (stored) setHistory(JSON.parse(stored));
    }, []);


    // For Rendering
    const loadHistoryItem = (item) => {
        setTarget(item.target);
        setResult(item.result);
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
                TraceRoute Scanner
            </h2>
            
            <div className="flex mb-4">
                <input
                    type="text"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter IP or domain"
                    className="border rounded-l px-3 py-2 w-full"
                />
                <button
                    onClick={handleRunScan}
                    className="bg-green-600 text-white px-4 py-2 rounded-r"
                >
                    {loading ? "Scanning..." : "Scan"}
                </button>
            </div>
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
                                        className={`py-1 px-2 font-semibold ${p.status === "open" ? "text-green-700" : "text-red-600"
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
    )
}
