import { describe, it, expect } from 'vitest'
import { loadAllChallenges } from '../../../src/utils/challenges'

describe('loadAllChallenges', () => {
    const challenges = loadAllChallenges()

    it('returns at least one challenge', () => {
        expect(challenges.length).toBeGreaterThan(0)
    })

    it('returns objects with slug and frontmatter', () => {
        for (const c of challenges) {
            expect(c.slug).toEqual(expect.any(String))
            expect(c.slug).not.toContain('.md')
            expect(c.frontmatter).toEqual(expect.any(Object))
        }
    })

    it('attaches an ISO mtime to every entry', () => {
        for (const { slug, frontmatter } of challenges) {
            expect(
                frontmatter.mtime,
                `${slug} is missing mtime`
            ).toMatch(/^\d{4}-\d{2}-\d{2}T/)
        }
    })

    it('caches results across calls', () => {
        expect(loadAllChallenges()).toBe(challenges)
    })
})
