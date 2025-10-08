import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function LatencyChart({ ports }) {
  if (!ports?.length) return null;

  const data = {
    labels: ports.map(p => `Port ${p.port}`),
    datasets: [
      {
        label: "Latency (ms)",
        data: ports.map(p => p.latency),
        backgroundColor: "rgba(34,197,94,0.6)", // Tailwind green-500
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Port Latency Overview" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return <Bar data={data} options={options} />;
}