import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBook extends Component {


    handleChange(query, maxResult) {
        this.props.onSearchBook(query, maxResult)
    }

    onAddBook(shelf,book){
        this.props.onAddBook(shelf,book)
    }

    render() {
        const searchResult = this.props.searchResult !== undefined ? this.props.searchResult:[]

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link  className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={(event)=> this.handleChange(event.target.value, 10)} type="text"
                               placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult.map(book =>
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf}  onChange={(event)=> this.onAddBook(event.target.value,book)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

SearchBook.propTypes={
    searchResult: PropTypes.array.isRequired,
    onSearchBook: PropTypes.func.isRequired,
    onAddBook: PropTypes.func.isRequired
}

export default SearchBook