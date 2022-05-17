
import React from 'react';

export default function SearchBar({filterNotes, searchRef}) {

  return (
    <div className="searchBar">
        <input className="search-input" type="text" ref={searchRef}/>
        <a className="btn btn-search" onClick={() => filterNotes(searchRef.current.value)}>Search</a>
        <a className="btn logout-btn" onClick={() => location.replace("/note/logout")}><i className="fa fa-sign-out"></i>Logout</a>
    </div>
  )
}
