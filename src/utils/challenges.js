import fs from 'fs'
import matter from 'gray-matter'
import { validateFrontmatter } from './challenge-schema.js'

const CHALLENGES_DIR = 'challenges'

let cache = null

// Reads /challenges once per build. Node module evaluation caches this
// module, so repeated calls across getStaticProps invocations are free
// after the first.
export function loadAllChallenges() {
    if (cache) return cache

    const files = fs
        .readdirSync(CHALLENGES_DIR)
        .filter(name => name.endsWith('.md'))

    cache = files.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const filepath = `${CHALLENGES_DIR}/${fileName}`
        const raw = fs.readFileSync(filepath, 'utf-8')
        const stats = fs.statSync(filepath)
        const { data: rawFrontmatter } = matter(raw)
        const frontmatter = validateFrontmatter(slug, rawFrontmatter)
        frontmatter.mtime = stats.mtime.toISOString()
        return { slug, frontmatter }
    })

    return cache
}
