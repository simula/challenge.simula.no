import { FiExternalLink } from 'react-icons/fi'

export default function Card({ title, desc, link, lastUpdated }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary"
        >
            <div className="flex flex-1 flex-col px-5 pt-4">
                <h3 className="flex items-start justify-between gap-2 text-lg font-semibold leading-snug tracking-tight text-gray-900">
                    <span>{title}</span>
                    <FiExternalLink
                        className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-primary"
                        aria-hidden="true"
                    />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {desc}
                </p>
            </div>
            {lastUpdated && (
                <div className="mt-3 border-t border-gray-100 px-5 py-2.5">
                    <span className="text-xs text-gray-500">
                        Updated {lastUpdated}
                    </span>
                </div>
            )}
        </a>
    )
}
