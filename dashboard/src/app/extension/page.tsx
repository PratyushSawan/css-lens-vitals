"use client";

import * as React from "react";
import Footer from "../components/footer";

export default function Home() {
    const [url, setUrl] = React.useState("");

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div>
                    <h1 className="text-4xl font-bold text-center sm:text-left">
                        Go Back to{" "}
                        <span className="text-[hsl(280,100%,70%)]">
                            <a href="/">CSS Lens Vitals!</a>
                        </span>
                    </h1>
                    <p className="mt-2 text-lg text-center sm:text-left">
                        We are working on our VS code Extension...&nbsp;
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
