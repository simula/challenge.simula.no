import { FACETS } from '../data/tags.js'

// Per-facet tag counts: { series: { medico: 7, ... }, year: { 2022: 3, ... }, domain: {...}, task: {...} }.
// Powers the option counts in each FacetDropdown. Scalar fields (series, year)
// are wrapped to arrays of one before counting so the same loop handles both
// shapes. Year is coerced to string to match URL-param comparisons downstream.
export function countFacets(challenges) {
    const counts = {}
    for (const { key, field } of FACETS) {
        const bucket = {}
        for (const c of challenges) {
            const v = c.frontmatter[field]
            const tags = Array.isArray(v)
                ? v
                : v === undefined || v === null || v === ''
                  ? []
                  : [v]
            for (const tag of tags) {
                const k = String(tag)
                bucket[k] = (bucket[k] || 0) + 1
            }
        }
        counts[key] = bucket
    }
    return counts
}

// Years present in the catalog, sorted most-recent-first. Year is a
// data-derived facet, so its option list is computed at build time
// rather than enumerated in the taxonomy file.
export function deriveYearTags(challenges) {
    const set = new Set()
    for (const c of challenges) {
        if (c.frontmatter.year != null) set.add(String(c.frontmatter.year))
    }
    return [...set].sort((a, b) => Number(b) - Number(a))
}
