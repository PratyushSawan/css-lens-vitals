"use client";

import * as React from "react";
import Image from "next/image";

export default function Home() {
    const [url, setUrl] = React.useState("");

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div>
                    <h1 className="text-4xl font-bold text-center sm:text-left">
                        Welcome to <span className="text-[hsl(280,100%,70%)]">CSS Lens Vitals!</span>
                    </h1>
                    <p className="mt-2 text-lg text-center sm:text-left">
                        Get started by entering your WEB URL&nbsp;
                    </p>
                </div>
                <div className="w-full flex flex-col items-center sm:items-start">
                    <input className="mt-2 w-full text-lg text-center sm:text-left border-2 border-gray-300 p-2 rounded-md" placeholder="Enter your URL here" value={url} onChange={(e) => setUrl(e.target.value)} >
                    </input>
                    <button className="mt-2 bg-[hsl(280,100%,70%)] text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-[hsl(280,100%,60%)] transition-colors" onClick={() => { console.log("Analyzing URL:", url); }}>
                        Analyze 🧑🏻‍💻
                    </button>
                </div>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    VS Code Extension
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.pratyushsawan.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to pratyushsawan.co.in →
                </a>
            </footer>
        </div>
    );
}
