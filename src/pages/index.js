import { useState } from 'react'
import { SearchContext } from '../context/search'
import { ItemGrid } from '../components/grid'
import SearchAndFilter from '../components/search'
import { loadAllChallenges } from '../utils/challenges'

export async function getStaticProps() {
    const challenges = loadAllChallenges().map(({ slug, frontmatter }) => ({
        slug,
        frontmatter: {
            ...frontmatter,
            mtime: new Date(frontmatter.mtime).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
            })
        }
    }))

    return {
        props: {
            challenges
        }
    }
}

export default function Home({ challenges }) {
    const [value, setValue] = useState('')

    return (
        <SearchContext.Provider value={{ value, setValue }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="mb-6 text-center">
                    <h1 className="mb-2 text-4xl font-semibold tracking-tight text-gray-900">
                        Simula Challenges
                    </h1>
                    <p className="text-lg text-gray-600">
                        A collection of challenges published by Simula Research
                        Laboratory and SimulaMet.
                    </p>
                </div>
                <SearchAndFilter />
                <ItemGrid items={challenges} />
            </div>
        </SearchContext.Provider>
    )
}
