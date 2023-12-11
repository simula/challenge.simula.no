import Link from 'next/link'
import { useContext } from 'react'
import { SearchContext } from '../context/search'

export default function Card(props) {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div
            key={props.link}
            className="m-2 flex h-60  flex-col overflow-hidden rounded-xl border border-gray-300 shadow-lg"
        >
            <a target="_blank" rel="noreferrer" href={`${props.link}`}>
                <div className="flex cursor-pointer items-between justify-between flex-col overflow-hidden h-full">
                    <div>
                        <h1 className="mt-1 px-4 py-2 text-2xl font-medium leading-tight">
                            {props.title}
                        </h1>
                        <div className="px-4 text-slate-600">
                            {props.desc}
                        </div>
                    </div>
                    <div className="h-12 p-4 text-slate-600">
                        <span className="text-xs">
                            Updated on {props.lastUpdated}{' '}
                        </span>
                    </div>
                </div>
            </a>
        </div>
    )
}
