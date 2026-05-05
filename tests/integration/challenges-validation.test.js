import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { describe, it, expect } from 'vitest'

const CHALLENGES_DIR = path.resolve(__dirname, '../../challenges')

const files = fs
    .readdirSync(CHALLENGES_DIR)
    .filter(name => name.endsWith('.md'))

describe('challenges/ frontmatter', () => {
    it('contains at least one challenge', () => {
        expect(files.length).toBeGreaterThan(0)
    })

    it.each(files)('%s has required frontmatter fields', file => {
        const raw = fs.readFileSync(path.join(CHALLENGES_DIR, file), 'utf-8')
        const { data } = matter(raw)

        expect(data.title, 'missing title').toEqual(expect.any(String))
        expect(data.title.length).toBeGreaterThan(0)

        expect(data.desc, 'missing desc').toEqual(expect.any(String))
        expect(data.desc.length).toBeGreaterThan(0)

        expect(data.link, 'missing link').toEqual(expect.any(String))
        expect(data.link).toMatch(/^https?:\/\//)
    })
})
