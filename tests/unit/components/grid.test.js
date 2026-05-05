import { describe, it, expect } from 'vitest'
import { filterChallenges } from '../../../src/components/grid'

const challenges = [
    {
        slug: 'medico-2017',
        frontmatter: { title: 'Medico 2017', desc: 'Predicting GI diseases.' }
    },
    {
        slug: 'imageclef-2018',
        frontmatter: {
            title: 'ImageCLEFlifelog 2018',
            desc: 'Lifelogging challenges.'
        }
    },
    {
        slug: 'biomedia-2020',
        frontmatter: {
            title: 'BioMedia 2020',
            desc: 'Reproducibility in AI-based medical imaging.'
        }
    },
    {
        slug: 'wip',
        frontmatter: {
            title: 'WIP entry',
            desc: 'Should not appear.',
            hidden: true
        }
    }
]

describe('filterChallenges', () => {
    it('excludes hidden entries even with no query', () => {
        const slugs = filterChallenges(challenges, '').map(c => c.slug)
        expect(slugs).not.toContain('wip')
        expect(slugs).toHaveLength(3)
    })

    it('matches title case-insensitively', () => {
        const result = filterChallenges(challenges, 'medico')
        expect(result.map(c => c.slug)).toEqual(['medico-2017'])
    })

    it('matches description text', () => {
        const result = filterChallenges(challenges, 'reproducibility')
        expect(result.map(c => c.slug)).toEqual(['biomedia-2020'])
    })

    it('returns empty array when nothing matches', () => {
        expect(filterChallenges(challenges, 'nope')).toEqual([])
    })

    it('treats whitespace-only queries as empty', () => {
        expect(filterChallenges(challenges, '   ')).toHaveLength(3)
    })
})
