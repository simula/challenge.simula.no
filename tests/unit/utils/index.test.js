import { describe, it, expect } from 'vitest'
import { countFacets, deriveYearTags } from '../../../src/utils'

const sample = [
    {
        slug: 'a',
        frontmatter: {
            series: 'medico',
            year: 2022,
            domain: ['health'],
            tasks: ['classification', 'segmentation']
        }
    },
    {
        slug: 'b',
        frontmatter: {
            series: 'medico',
            year: 2021,
            domain: ['health'],
            tasks: ['classification']
        }
    },
    {
        slug: 'c',
        frontmatter: {
            series: 'imageclef',
            year: 2022,
            domain: [],
            tasks: []
        }
    }
]

describe('countFacets', () => {
    it('buckets counts per facet, normalising scalars to single-tag arrays', () => {
        const counts = countFacets(sample)
        expect(counts.series).toEqual({ medico: 2, imageclef: 1 })
        expect(counts.year).toEqual({ 2022: 2, 2021: 1 })
        expect(counts.domain).toEqual({ health: 2 })
        expect(counts.task).toEqual({ classification: 2, segmentation: 1 })
    })

    it('skips empty/undefined fields without throwing', () => {
        const counts = countFacets([
            { slug: 'x', frontmatter: { series: 'nora', year: 2022 } }
        ])
        expect(counts.domain).toEqual({})
        expect(counts.task).toEqual({})
    })
})

describe('deriveYearTags', () => {
    it('returns unique years sorted descending as strings', () => {
        expect(deriveYearTags(sample)).toEqual(['2022', '2021'])
    })

    it('ignores entries without a year', () => {
        expect(
            deriveYearTags([
                { slug: 'x', frontmatter: { year: 2020 } },
                { slug: 'y', frontmatter: {} }
            ])
        ).toEqual(['2020'])
    })
})
