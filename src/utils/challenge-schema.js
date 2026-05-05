import { z } from 'zod'
import { SERIES_TAGS, DOMAIN_TAGS, TASK_TAGS } from '../data/tags.js'

// Schema for challenge frontmatter (the YAML block at the top of each
// challenges/<slug>.md file). Enforced by loadAllChallenges() and by the
// challenges-validation integration test, so every contribution path —
// build, dev, CI — fails fast on bad data.
//
// `mtime` is attached by the loader after parsing, so it is not part of
// the contributor-supplied schema.

export const challengeFrontmatterSchema = z
    .object({
        title: z.string().min(1, 'title is required'),
        desc: z.string().min(1, 'desc is required'),
        link: z.string().refine(v => /^https?:\/\//.test(v), {
            message: 'must be a http(s) URL'
        }),
        series: z.enum(SERIES_TAGS),
        year: z.number().int().min(2000).max(2100),
        domain: z.array(z.enum(DOMAIN_TAGS)).default([]),
        tasks: z.array(z.enum(TASK_TAGS)).default([]),
        hidden: z.boolean().optional()
    })
    .strict()

export function validateFrontmatter(slug, frontmatter) {
    const { mtime: _mtime, ...rest } = frontmatter
    const result = challengeFrontmatterSchema.safeParse(rest)
    if (result.success) return result.data
    const issues = result.error.issues
        .map(i => `  - ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n')
    throw new Error(
        `Invalid challenge frontmatter in challenges/${slug}.md:\n${issues}`
    )
}
