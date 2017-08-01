import React from 'react'
import PropTypes from 'prop-types'

class BookSection extends React.Component {

    handleChange(shelf, book) {
        this.props.onUpdateBook(book, shelf)
    }

    render() {
        const bookList = this.props.bookList !== undefined ? this.props.bookList : []
        const sectionTitle = this.props.sectionTitle

        return <div className="bookshelf">
            <h2 className="bookshelf-title">{sectionTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookList.map(book =>
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                                    }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={book.shelf}
                                                onChange={(event)=> this.handleChange(event.target.value, book)}>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors[0]}</div>
                            </div>
                        </li>
                    )}

                </ol>
            </div>
        </div>
    }
}


BookSection.propTypes = {
    bookList: PropTypes.array,
    sectionTitle: PropTypes.string,
    onUpdateBook: PropTypes.func.isRequired
}

export default BookSection