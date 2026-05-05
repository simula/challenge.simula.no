import { describe, it, expect } from 'vitest'
import {
    readFilterState,
    filterChallenges,
    sortChallenges
} from '../../../src/utils/filter'

const sample = [
    {
        slug: 'medico-2017',
        frontmatter: {
            title: 'Medico 2017',
            desc: 'Predicting GI diseases.',
            series: 'medico',
            year: 2017,
            domain: ['health'],
            tasks: ['classification'],
            mtime: '2017-09-01T00:00:00.000Z'
        }
    },
    {
        slug: 'medico-2022',
        frontmatter: {
            title: 'Medico 2022',
            desc: 'Predicting GI diseases.',
            series: 'medico',
            year: 2022,
            domain: ['health'],
            tasks: ['classification', 'segmentation'],
            mtime: '2022-09-01T00:00:00.000Z'
        }
    },
    {
        slug: 'imageclef-2018',
        frontmatter: {
            title: 'ImageCLEFlifelog 2018',
            desc: 'Lifelogging challenges.',
            series: 'imageclef',
            year: 2018,
            domain: [],
            tasks: [],
            mtime: '2018-04-01T00:00:00.000Z'
        }
    },
    {
        slug: 'biomedia-2020',
        frontmatter: {
            title: 'BioMedia 2020',
            desc: 'Reproducibility in AI-based medical imaging.',
            series: 'biomedia',
            year: 2020,
            domain: ['health'],
            tasks: ['classification'],
            mtime: '2020-06-01T00:00:00.000Z'
        }
    }
]

describe('readFilterState', () => {
    it('returns defaults for an empty query', () => {
        const state = readFilterState('')
        expect(state.q).toBe('')
        expect(state.sort).toBe('recent')
        expect(state.facets.series).toEqual([])
        expect(state.facets.year).toEqual([])
        expect(state.facets.domain).toEqual([])
        expect(state.facets.task).toEqual([])
    })

    it('parses repeatable facet params', () => {
        const state = readFilterState(
            'q=GI&series=medico&series=biomedia&year=2022&task=segmentation'
        )
        expect(state.q).toBe('GI')
        expect(state.facets.series).toEqual(['medico', 'biomedia'])
        expect(state.facets.year).toEqual(['2022'])
        expect(state.facets.task).toEqual(['segmentation'])
    })

    it('rejects unknown sort values, falling back to recent', () => {
        expect(readFilterState('sort=hello').sort).toBe('recent')
        expect(readFilterState('sort=az').sort).toBe('az')
        expect(readFilterState('sort=za').sort).toBe('za')
    })
})

describe('filterChallenges', () => {
    it('returns all entries when no search and no facets are set', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '',
            facets: {}
        })
        expect(out).toHaveLength(sample.length)
    })

    it('matches title case-insensitively, trimming whitespace', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '  MEDICO  ',
            facets: {}
        })
        expect(out.map(c => c.slug)).toEqual(['medico-2017', 'medico-2022'])
    })

    it('matches description text', () => {
        const out = filterChallenges({
            challenges: sample,
            search: 'reproducibility',
            facets: {}
        })
        expect(out.map(c => c.slug)).toEqual(['biomedia-2020'])
    })

    it('matches tag values (series/year/domain/task)', () => {
        expect(
            filterChallenges({
                challenges: sample,
                search: 'segmentation',
                facets: {}
            }).map(c => c.slug)
        ).toEqual(['medico-2022'])
        expect(
            filterChallenges({
                challenges: sample,
                search: '2018',
                facets: {}
            }).map(c => c.slug)
        ).toEqual(['imageclef-2018'])
    })

    it('selects ORs within a single facet', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '',
            facets: { series: ['medico', 'biomedia'] }
        })
        expect(out.map(c => c.slug).sort()).toEqual(
            ['biomedia-2020', 'medico-2017', 'medico-2022'].sort()
        )
    })

    it('ANDs across facets', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '',
            facets: { series: ['medico'], year: ['2022'] }
        })
        expect(out.map(c => c.slug)).toEqual(['medico-2022'])
    })

    it('compares year as a string against URL-derived facet values', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '',
            facets: { year: ['2018'] }
        })
        expect(out.map(c => c.slug)).toEqual(['imageclef-2018'])
    })

    it('returns empty when nothing matches', () => {
        expect(
            filterChallenges({
                challenges: sample,
                search: 'zzznomatch',
                facets: {}
            })
        ).toEqual([])
    })

    it('treats whitespace-only search as no search', () => {
        const out = filterChallenges({
            challenges: sample,
            search: '   ',
            facets: {}
        })
        expect(out).toHaveLength(sample.length)
    })
})

describe('sortChallenges', () => {
    it('default sort is year desc, mtime desc as tiebreaker', () => {
        const out = sortChallenges(sample, 'recent')
        expect(out.map(c => c.frontmatter.year)).toEqual([
            2022, 2020, 2018, 2017
        ])
    })

    it('az sorts by title ascending', () => {
        const out = sortChallenges(sample, 'az')
        expect(out.map(c => c.frontmatter.title)).toEqual([
            'BioMedia 2020',
            'ImageCLEFlifelog 2018',
            'Medico 2017',
            'Medico 2022'
        ])
    })

    it('za sorts by title descending', () => {
        const out = sortChallenges(sample, 'za')
        expect(out.map(c => c.frontmatter.title)).toEqual([
            'Medico 2022',
            'Medico 2017',
            'ImageCLEFlifelog 2018',
            'BioMedia 2020'
        ])
    })

    it('does not mutate the input', () => {
        const original = sample.slice()
        sortChallenges(sample, 'az')
        expect(sample).toEqual(original)
    })
})
