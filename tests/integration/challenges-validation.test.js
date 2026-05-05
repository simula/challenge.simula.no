import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { describe, it, expect } from 'vitest'
import { challengeFrontmatterSchema } from '../../src/utils/challenge-schema'

const CHALLENGES_DIR = path.resolve(__dirname, '../../challenges')

const files = fs
    .readdirSync(CHALLENGES_DIR)
    .filter(name => name.endsWith('.md'))

describe('challenges/ frontmatter', () => {
    it('contains at least one challenge', () => {
        expect(files.length).toBeGreaterThan(0)
    })

    it.each(files)('%s passes the frontmatter schema', file => {
        const raw = fs.readFileSync(path.join(CHALLENGES_DIR, file), 'utf-8')
        const { data } = matter(raw)
        const result = challengeFrontmatterSchema.safeParse(data)
        if (!result.success) {
            const issues = result.error.issues
                .map(i => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
                .join('\n')
            throw new Error(`Schema validation failed for ${file}:\n${issues}`)
        }
    })
})
