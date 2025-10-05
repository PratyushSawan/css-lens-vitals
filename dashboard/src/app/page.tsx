"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Result from "./components/Results";
import Footer from "./components/footer";

export default function Home() {
  const [url, setUrl] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleAnalyze = () => {
    if (!url) return;
    setShowResult(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      {/* Header */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2"
        animate={{ y: showResult ? 0 : 200 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <div className="flex gap-2 min-w-screen items-center justify-center backdrop-blur-2xl">
          <input
            type="url"
            placeholder="Enter web URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-72"
          />
          <button
            onClick={handleAnalyze}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-1"
          >
            Analyze <span>👩‍💻</span>
          </button>
        </div>
      </motion.div>

      {/* Title (only when not showing results) */}
      {!showResult && (
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Welcome to{" "}
            <span className="text-purple-500">CSS Lens Vitals!</span>
          </h1>
          <p className="text-gray-600">Get started by entering your WEB URL</p>
        </div>
      )}

      {/* Result Section */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="w-full h-150"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Result url={url} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer />
    </div>
  );
}
