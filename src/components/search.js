import { useContext } from 'react'
import { FiSearch } from 'react-icons/fi'
import { SearchContext } from '../context/search'

export default function SearchAndFilter() {
    const { value, setValue } = useContext(SearchContext)

    return (
        <div className="mx-auto mt-2 mb-8 flex w-full max-w-md items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
            <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
            <input
                type="search"
                aria-label="Search challenges"
                placeholder="Search challenges…"
                onChange={e => setValue(e.target.value)}
                value={value}
                className="w-full border-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
        </div>
    )
}
