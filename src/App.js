import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import  ListBook from './ListBook'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
    state = {
        showSearchPage: true,
        bookList: [],
        books: {}
    }

    componentDidMount() {
        BooksAPI.getAll().then((bookList) => {
            this.setState({bookList})
        })
    }

    AddBook(shelf, book) {
        this.state.bookList.push(book)
        this.UpdateBook(book, shelf)
    }

    UpdateBook(book, shelf) {
        BooksAPI.update(book, shelf).then((books) => {
            let _bookLst = this.state.bookList;
            let booksCopy = {
                currentlyReading: [],
                read: [],
                wantToRead: []
            };

            // change shelf
            if (_bookLst.filter((bookItm) => bookItm.id === book.id) != undefined
                && _bookLst.filter((bookItm) => bookItm.id === book.id)[0] !== undefined) {

                let selBook = _bookLst.filter((bookItm) => bookItm.id === book.id)[0]
                selBook.shelf = shelf;
            }

            // create book object
            books.currentlyReading.map((item)=> {
                booksCopy.currentlyReading.push(_bookLst.filter((book) => book.id === item)[0])
            });

            books.read.map((item)=> {
                booksCopy.read.push(_bookLst.filter((book) => book.id === item)[0])
            });

            books.wantToRead.map((item)=> {
                booksCopy.wantToRead.push(_bookLst.filter((book) => book.id === item)[0])
            });

            books = booksCopy;
            this.setState({books})
        })
    }

    render() {
        let bookList = this.state.bookList;
        let currentlyReading = bookList != null ? bookList.filter((c) => c.shelf === 'currentlyReading') : []
        let wantToRead = bookList != null ? bookList.filter((c) => c.shelf === 'wantToRead') : []
        let read = bookList != null ? bookList.filter((c) => c.shelf === 'read') : []

        let books = {
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read
        };

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBook books={books}
                              onUpdateBook={(book, shelf)=> {
                                  this.UpdateBook(book, shelf)
                              }}
                    ></ListBook>
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBook
                        bookList={bookList}
                        onAddBook={(shelf, book)=> {
                            this.AddBook(shelf, book)
                            history.push('/')
                        }}
                    ></SearchBook>
                )}/>
            </div>
        )
    }
}

export default BooksApp
