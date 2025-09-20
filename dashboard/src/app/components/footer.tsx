import Image from "next/image";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex gap-6 flex-wrap items-center justify-center bg-white py-3">
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

    )
}