// Curated tag taxonomy for challenge frontmatter.
//
// Adding a new tag is an explicit, reviewed change: append an entry
// here in the same PR that introduces a challenge using it. The schema
// in src/utils/challenge-schema.js rejects any tag not in the per-facet
// list it derives from this file.
//
// Tags are split across facets so the filter UI can present them as
// separate axes (Series × Year × Domain × Task) instead of one flat list.
// Year is data-derived (every challenge has an explicit year field), so
// it does not appear in this taxonomy — its options are computed from
// the loaded challenges at build time.

export const TAG_DEFINITIONS = [
    { tag: 'medico', label: 'Medico', category: 'series' },
    { tag: 'imageclef', label: 'ImageCLEF', category: 'series' },
    { tag: 'biomedia', label: 'BioMedia', category: 'series' },
    { tag: 'endotect', label: 'EndoTect', category: 'series' },
    { tag: 'nora', label: 'NORA', category: 'series' },
    { tag: 'health', label: 'Health & medical', category: 'domain' },
    { tag: 'sports', label: 'Sports', category: 'domain' },
    { tag: 'networks', label: 'Networking', category: 'domain' },
    { tag: 'misinformation', label: 'Misinformation', category: 'domain' },
    { tag: 'segmentation', label: 'Segmentation', category: 'task' },
    { tag: 'detection', label: 'Detection', category: 'task' },
    { tag: 'classification', label: 'Classification', category: 'task' },
    { tag: 'pose-estimation', label: 'Pose estimation', category: 'task' },
    { tag: 'vqa', label: 'Visual Question Answering', category: 'task' },
    { tag: 'tracking', label: 'Object tracking', category: 'task' },
    { tag: 'forecasting', label: 'Time-series forecasting', category: 'task' },
    { tag: 'summarization', label: 'Summarization', category: 'task' },
    { tag: 'captioning', label: 'Captioning', category: 'task' }
]

const tagsByCategory = category =>
    TAG_DEFINITIONS.filter(t => t.category === category).map(t => t.tag)

export const SERIES_TAGS = tagsByCategory('series')
export const DOMAIN_TAGS = tagsByCategory('domain')
export const TASK_TAGS = tagsByCategory('task')

export const TAG_CATEGORY = Object.fromEntries(
    TAG_DEFINITIONS.map(t => [t.tag, t.category])
)

export const TAG_LABEL = Object.fromEntries(
    TAG_DEFINITIONS.map(t => [t.tag, t.label])
)

// Iteration order = display order in the filter UI.
// `tags: 'derived'` flags facets whose options come from the data itself
// (year), not from the closed-set taxonomy above.
export const FACETS = [
    { key: 'series', label: 'Series', tags: SERIES_TAGS, field: 'series' },
    { key: 'year', label: 'Year', tags: 'derived', field: 'year' },
    { key: 'domain', label: 'Domain', tags: DOMAIN_TAGS, field: 'domain' },
    { key: 'task', label: 'Task', tags: TASK_TAGS, field: 'tasks' }
]
