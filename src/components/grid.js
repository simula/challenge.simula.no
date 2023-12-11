import Card from './card'
import { useContext } from 'react'
import { SearchContext } from '../context/search'

const itemSearchCriteria = (props, criteria) => {
    return (
        itemTitleFilter(props.frontmatter.title, criteria) ||
        itemTagFilter(props.frontmatter.tags, criteria)
    )
}

const itemTagFilter = (tags, criteria) => {
    return tags.includes(criteria)
}

const itemTitleFilter = (title, criteria) => {
    return title.toLowerCase().includes(criteria)
}

export function ItemGrid({ items }) {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div className="grid justify-center items-center grid-cols-1 p-4 md:grid-cols-2 md:p-0 lg:grid-cols-3 xl:grid-cols-4">
            {items
                .filter(props => !props.frontmatter.hidden)
                .filter(props => itemSearchCriteria(props, value))
                .map(props => {
                    return (
                        <Card
                            key={props.slug + props.link}
                            slug={props.slug}
                            title={props.frontmatter.title}
                            thumbnail={props.frontmatter.thumbnail}
                            desc={props.frontmatter.desc}
                            lastUpdated={props.frontmatter.mtime}
                            tags={props.frontmatter.tags}
                            link={props.frontmatter.link}
                        />
                    )
                })}
        </div>
    )
}
