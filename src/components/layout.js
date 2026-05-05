import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main-content"
                className="focus:text-primary sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:px-4 focus:py-2"
            >
                Skip to main content
            </a>
            <header className="bg-primary">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                    <Link
                        href="/"
                        aria-label="Simula Challenges home"
                        className="focus-visible:ring-offset-primary inline-flex items-center text-xl font-semibold tracking-tight text-white focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:text-2xl"
                    >
                        simula challenges
                    </Link>
                    <div className="flex items-center gap-5 text-sm font-medium text-white">
                        <a
                            href="https://www.simula.no"
                            className="focus-visible:ring-offset-primary hidden hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:inline"
                        >
                            Simula.no
                        </a>
                        <a
                            href="https://www.simulamet.no"
                            className="focus-visible:ring-offset-primary hidden hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:inline"
                        >
                            SimulaMet.no
                        </a>
                        <a
                            href="https://github.com/simula/challenge.simula.no"
                            className="focus-visible:ring-offset-primary inline-flex items-center gap-1.5 hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                            <FaGithub size="1rem" aria-hidden="true" />
                            <span>Contribute</span>
                        </a>
                    </div>
                </nav>
            </header>
            <main id="main-content" className="flex-1 bg-white py-10">
                {children}
            </main>
            <footer className="bg-primary py-5 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-sm sm:flex-row sm:px-6">
                    <p className="text-white/90">
                        ©{' '}
                        <a
                            href="https://www.simula.no"
                            className="focus-visible:ring-offset-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                            Simula Research Laboratory
                        </a>
                    </p>
                    <div className="flex items-center gap-5">
                        <a
                            href="https://github.com/simula/challenge.simula.no"
                            className="focus-visible:ring-offset-primary hover:underline focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                            Contribute a challenge
                        </a>
                        <a
                            href="https://github.com/simula/challenge.simula.no"
                            aria-label="View source code on GitHub"
                            className="focus-visible:ring-offset-primary transition-opacity hover:opacity-80 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        >
                            <FaGithub size="1.25rem" />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
