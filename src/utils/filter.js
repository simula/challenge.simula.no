import { FACETS } from '../data/tags.js'

export const VALID_SORTS = ['recent', 'az', 'za']

const FACET_KEYS = FACETS.map(f => f.key)

// Normalise a frontmatter field to a string array of selectable values.
// URL params are always strings, so series ("medico"), year (2020 → "2020"),
// domain (["health"]) and tasks (["segmentation"]) all reduce to arrays of
// strings the filter can compare uniformly.
function fieldValues(frontmatter, field) {
    const v = frontmatter[field]
    if (Array.isArray(v)) return v.map(String)
    if (v === undefined || v === null || v === '') return []
    return [String(v)]
}

// Read URL query params into a normalized filter state. Each facet has
// its own repeatable param (?series=medico&year=2022) so the four
// dimensions are independently shareable in the URL.
export function readFilterState(searchString) {
    const sp = new URLSearchParams(searchString || '')
    const sort = sp.get('sort')
    const facets = {}
    for (const key of FACET_KEYS) facets[key] = sp.getAll(key)
    return {
        q: sp.get('q') || '',
        facets,
        sort: VALID_SORTS.includes(sort) ? sort : 'recent'
    }
}

// AND across facets, OR within each facet — the standard faceted-search
// semantic. Selecting `series=medico series=imageclef` finds Medico-OR-ImageCLEF
// challenges; adding `year=2022` narrows that to ones that ALSO match 2022.
export function filterChallenges({ challenges, search, facets }) {
    const needle = (search || '').toLowerCase().trim()
    const safeFacets = facets || {}

    return challenges.filter(c => {
        for (const { key, field } of FACETS) {
            const selected = safeFacets[key] || []
            if (selected.length === 0) continue
            const cValues = fieldValues(c.frontmatter, field)
            if (!selected.some(t => cValues.includes(t))) return false
        }
        if (!needle) return true
        const fm = c.frontmatter
        const allTags = [
            fm.series,
            fm.year != null ? String(fm.year) : null,
            ...(fm.domain || []),
            ...(fm.tasks || [])
        ].filter(Boolean)
        return (
            fm.title.toLowerCase().includes(needle) ||
            fm.desc?.toLowerCase().includes(needle) ||
            allTags.some(t => t.toLowerCase().includes(needle))
        )
    })
}

// Default sort `recent` is year desc, mtime desc as tiebreaker — challenges
// are inherently year-stamped so this surfaces the latest editions first.
export function sortChallenges(challenges, sort) {
    const out = challenges.slice()
    if (sort === 'az') {
        out.sort((a, b) =>
            a.frontmatter.title.localeCompare(b.frontmatter.title)
        )
    } else if (sort === 'za') {
        out.sort((a, b) =>
            b.frontmatter.title.localeCompare(a.frontmatter.title)
        )
    } else {
        out.sort((a, b) => {
            const yearDiff =
                (b.frontmatter.year || 0) - (a.frontmatter.year || 0)
            if (yearDiff !== 0) return yearDiff
            return (
                new Date(b.frontmatter.mtime).getTime() -
                new Date(a.frontmatter.mtime).getTime()
            )
        })
    }
    return out
}
