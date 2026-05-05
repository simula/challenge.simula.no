import { memo } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import { TAG_CATEGORY, TAG_LABEL } from '../data/tags'

const MAX_TAGS_ON_CARD = 4
const CATEGORY_TO_FACET = { series: 'series', domain: 'domain', task: 'task' }

function Card({ challenge, onTagClick }) {
    const { frontmatter } = challenge
    // Series first (most identifying), then year, then domain, then tasks.
    const tags = [
        frontmatter.series,
        frontmatter.year != null ? String(frontmatter.year) : null,
        ...(frontmatter.domain || []),
        ...(frontmatter.tasks || [])
    ].filter(Boolean)
    const visibleTags = tags.slice(0, MAX_TAGS_ON_CARD)
    const overflowCount = tags.length - visibleTags.length

    // Year pills target the year facet directly; closed-set tags use the
    // taxonomy's category. Series is a known scalar tag in TAG_CATEGORY.
    const facetForTag = tag => {
        const category = TAG_CATEGORY[tag]
        if (category) return CATEGORY_TO_FACET[category]
        if (/^\d{4}$/.test(tag)) return 'year'
        return null
    }

    return (
        <div className="group focus-within:ring-primary flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition focus-within:ring-2 hover:border-gray-300 hover:shadow-lg motion-safe:duration-200 motion-safe:hover:-translate-y-0.5">
            <a
                href={frontmatter.link}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 flex-col px-5 pt-4 focus:outline-hidden"
            >
                <h3 className="flex items-start justify-between gap-2 text-lg leading-snug font-semibold tracking-tight text-gray-900">
                    <span>{frontmatter.title}</span>
                    <FiExternalLink
                        className="group-hover:text-primary mt-1 h-4 w-4 shrink-0 text-gray-400 transition-colors"
                        aria-hidden="true"
                    />
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                    {frontmatter.desc}
                </p>
            </a>

            {visibleTags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 px-5 pt-3 pb-4">
                    {visibleTags.map(tag => {
                        const facet = facetForTag(tag)
                        return (
                            <button
                                key={tag}
                                type="button"
                                disabled={!facet}
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    if (facet) onTagClick?.({ tag, facet })
                                }}
                                className="hover:bg-primary focus-visible:ring-primary rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:text-white focus:outline-hidden focus-visible:ring-2 disabled:cursor-default disabled:hover:bg-gray-100 disabled:hover:text-gray-700"
                            >
                                {TAG_LABEL[tag] || tag}
                            </button>
                        )
                    })}
                    {overflowCount > 0 && (
                        <span className="rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">
                            +{overflowCount}
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default memo(Card)
