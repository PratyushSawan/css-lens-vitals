"use client";

import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
// import { ArrowRightIcon } from '@heroicons/react/24/solid';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for CSS properties and their status
const cssData = {
  high: [
    {
      name: "filter",
      baseline: "high",
      support: "99%",
      description: "Applies graphic effects like blur, sepia, and brightness.",
    },
    {
      name: "border-radius",
      baseline: "high",
      support: "99%",
      description: "Creates rounded corners on an element.",
    },
    {
      name: "flexbox",
      baseline: "high",
      support: "99%",
      description:
        "A one-dimensional layout method for arranging items in rows or columns.",
    },
    {
      name: "grid",
      baseline: "high",
      support: "98%",
      description: "A two-dimensional layout system for CSS.",
    },
    {
      name: "transform",
      baseline: "high",
      support: "99%",
      description: "Applies 2D or 3D transformations to an element.",
    },
  ],
  low: [
    {
      name: "subgrid",
      baseline: "low",
      support: "17%",
      description:
        "Allows nested grids to inherit the track sizing of their parent grid.",
    },
    {
      name: "backdrop-filter",
      baseline: "low",
      support: "75%",
      description: "Applies filter effects to the area behind an element.",
    },
    {
      name: "has()",
      baseline: "low",
      support: "80%",
      description:
        "The :has() pseudo-class selects an element if any of the relative selectors match.",
    },
    {
      name: "scroll-snap",
      baseline: "low",
      support: "78%",
      description:
        "Allows developers to create well-controlled scrolling experiences.",
    },
  ],
};

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Sync with system preference on initial load
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(systemPrefersDark);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, []);

  useEffect(() => {
    // Apply dark mode class to the document body
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const highChartData = {
    labels: cssData.high.map((item) => item.name),
    datasets: [
      {
        label: "High Compatibility",
        data: cssData.high.map((item) => parseFloat(item.support)),
        backgroundColor: "rgba(52, 211, 153, 0.8)", // Tailwind green-400
        borderColor: "rgba(52, 211, 153, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lowChartData = {
    labels: cssData.low.map((item) => item.name),
    datasets: [
      {
        label: "Low Compatibility",
        data: cssData.low.map((item) => parseFloat(item.support)),
        backgroundColor: "rgba(239, 68, 68, 0.8)", // Tailwind red-500
        borderColor: "rgba(239, 68, 68, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDarkMode ? "#cbd5e1" : "#475569", // Tailwind slate-300 or slate-600
        },
      },
      title: {
        display: true,
        text: "CSS Property Browser Compatibility",
        color: isDarkMode ? "#f8fafc" : "#0f172a", // Tailwind slate-50 or slate-900
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${context.parsed.y}%`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? "#cbd5e1" : "#475569",
        },
        grid: {
          color: isDarkMode
            ? "rgba(203, 213, 225, 0.1)"
            : "rgba(71, 85, 105, 0.1)",
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? "#cbd5e1" : "#475569",
          callback: function (value) {
            return value + "%";
          },
        },
        grid: {
          color: isDarkMode
            ? "rgba(203, 213, 225, 0.1)"
            : "rgba(71, 85, 105, 0.1)",
        },
      },
    },
  };

  const Card = ({ item, color, isDarkMode }) => (
    <div
      className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-white text-slate-900"
      } border-l-4 ${color}`}
    >
      <h3 className="font-bold text-xl mb-2">{item.name}</h3>
      <p className="text-sm mb-2 opacity-80">{item.description}</p>
      <div className="flex items-center space-x-2 mt-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.baseline === "high"
              ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
              : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
          }`}
        >
          {item.support} Support
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isDarkMode
              ? "bg-slate-700 text-slate-300"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {item.baseline} Baseline
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen font-sans ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900"
      }`}
    >
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-300 z-10 sticky top-0 backdrop-blur-sm">
          <h1 className="text-3xl font-extrabold tracking-tight">
            CSS Dashboard
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 shadow-md ${
              isDarkMode
                ? "bg-slate-700 text-yellow-400 hover:bg-slate-600"
                : "bg-white text-slate-700 hover:bg-slate-200"
            }`}
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.06l1.59-1.591zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5h2.25a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.06 1.06l1.591 1.59zM12 18.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM4.22 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.06l-1.59 1.591zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.166 7.106a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 001.06 1.06l1.59-1.591z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M9.53 2.472a.75.75 0 010 1.06L5.81 7.25h15.94a.75.75 0 010 1.5H5.81l3.72 3.718a.75.75 0 11-1.06 1.06l-5-5a.75.75 0 010-1.06l5-5a.75.75 0 011.06 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-4 md:p-8 flex-grow">
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CSS Property Compatibility
            </h2>
            <div
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div style={{ height: "400px" }}>
                <Bar options={chartOptions} data={highChartData} />
              </div>
            </div>
            <p
              className={`mt-2 text-sm md:text-base opacity-75 ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              The chart above visualizes the browser compatibility of common CSS
              properties with a high baseline.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CSS Properties with Low Baseline
            </h2>
            <div
              className={`p-6 rounded-xl shadow-lg transition-all duration-300 ${
                isDarkMode ? "bg-slate-800" : "bg-white"
              }`}
            >
              <div style={{ height: "400px" }}>
                <Bar options={chartOptions} data={lowChartData} />
              </div>
            </div>
            <p
              className={`mt-2 text-sm md:text-base opacity-75 ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              This chart shows the browser compatibility of newer or less widely
              adopted CSS properties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              High Baseline Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cssData.high.map((item, index) => (
                <Card
                  key={index}
                  item={item}
                  color="border-green-500"
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Low Baseline Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cssData.low.map((item, index) => (
                <Card
                  key={index}
                  item={item}
                  color="border-red-500"
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer
          className={`p-4 text-center transition-all duration-300 ${
            isDarkMode
              ? "bg-slate-800 text-slate-400"
              : "bg-white text-slate-600"
          }`}
        >
          <p className="text-sm">Built with Next.js, React, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
