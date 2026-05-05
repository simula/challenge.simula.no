import { useContext } from 'react'
import Card from './card'
import { SearchContext } from '../context/search'

export function filterChallenges(items, query) {
    const visible = items.filter(item => !item.frontmatter.hidden)
    const q = (query || '').trim().toLowerCase()
    if (!q) return visible
    return visible.filter(({ frontmatter }) => {
        const title = (frontmatter.title || '').toLowerCase()
        const desc = (frontmatter.desc || '').toLowerCase()
        return title.includes(q) || desc.includes(q)
    })
}

export function ItemGrid({ items }) {
    const { value } = useContext(SearchContext)
    const filtered = filterChallenges(items, value)

    if (filtered.length === 0) {
        return (
            <div className="mx-auto max-w-md py-16 text-center text-gray-500">
                <p>No challenges match your search.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-0 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map(({ slug, frontmatter }) => (
                <Card
                    key={slug}
                    title={frontmatter.title}
                    desc={frontmatter.desc}
                    link={frontmatter.link}
                    lastUpdated={frontmatter.mtime}
                />
            ))}
        </div>
    )
}
