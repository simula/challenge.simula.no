import { useContext, useState } from 'react'
import { SearchContext } from '../context/search'
import fs from 'fs'
import matter from 'gray-matter'
import { ItemGrid } from '../components/grid'
import SearchAndFilter from '../components/search'

export async function getStaticProps() {
    const files = fs.readdirSync('challenges')

    const challenges = files.map(fileName => {
        const slug = fileName.replace('.md', '')
        const filepath = `challenges/${fileName}`
        const readFile = fs.readFileSync(filepath, 'utf-8')
        const stats = fs.statSync(filepath)
        const { data: frontmatter } = matter(readFile)
        frontmatter.mtime = stats.mtime.toLocaleDateString()
        return {
            slug,
            frontmatter
        }
    })

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
            <div>
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-4xl">Simula Challenges</h1>
                    <h2 className="text-xl">
                        A collection of challenges published by{' '}
                        <br />
                        Simula Research Laboratory and SimulaMet.
                    </h2>
                </div>
                <ItemGrid items={challenges} />
            </div>
        </SearchContext.Provider>
    )
}
