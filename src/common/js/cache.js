import storage from 'good-storage'

const SEARCH_KEY =  '__search__'

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    const index = searches.indexof(query)

    storage.set(SEARCH_KEY, searches)
    return searches
}