
export default function SearchBar({filterNotes, searchRef}) {

  return (
    <div className="searchBar">
        <input className="search-input" type="text" ref={searchRef}/>
        <a className="btn btn-search" onClick={() => filterNotes(searchRef.current.value)}>Search</a>
    </div>
  )
}
