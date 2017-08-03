import React, {Component} from 'react'
import BookSection from './BookSection'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBook extends Component {

    render() {
            const {books}=this.props

        let currentlyReading = books.currentlyReading
        let wantToRead =  books.wantToRead
        let read =  books.read


        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookSection
                            bookList={currentlyReading}
                            sectionTitle="Currently Reading"
                            onUpdateBook={this.props.onUpdateBook}/>
                        <BookSection
                            bookList={wantToRead}
                            sectionTitle="Want to Read"
                            onUpdateBook={this.props.onUpdateBook}/>
                        <BookSection
                            bookList={read}
                            sectionTitle="Read"
                            onUpdateBook={this.props.onUpdateBook}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>


        )
    }
}

ListBook.propTypes={
    books: PropTypes.object.isRequired,
    onUpdateBook:PropTypes.func.isRequired
}

export default ListBook