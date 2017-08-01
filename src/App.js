import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import  ListBook from './ListBook'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
    state = {
        showSearchPage: true,
        bookList: [],
        books: {},
        searchResult:[]
    }

    componentDidMount() {
        BooksAPI.getAll().then((bookList) => {
            this.setState({bookList})
            let currentlyReading = bookList != null ? bookList.filter((c) => c.shelf === 'currentlyReading') : []
            let wantToRead = bookList != null ? bookList.filter((c) => c.shelf === 'wantToRead') : []
            let read = bookList != null ? bookList.filter((c) => c.shelf === 'read') : []

            let books = {
                currentlyReading: currentlyReading,
                wantToRead: wantToRead,
                read: read
            };

            this.setState({books})
        })
    }

    SearchBook(query,maxResult){
        BooksAPI.search(query,maxResult).then((searchResult)=>{
            this.setState({searchResult})
        })
    }

    AddBook(shelf,book){
        if(shelf==='currentlyReading')
            this.state.books.currentlyReading.push(book);
        if(shelf==='wantToRead')
            this.state.books.wantToRead.push(book);
        if(shelf==='read')
            this.state.books.read.push(book);
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
            if (_bookLst.filter((bookItm) => bookItm.id === book.id)[0] !== undefined)
                _bookLst.filter((bookItm) => bookItm.id === book.id)[0].shelf = shelf;

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
        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <ListBook books={this.state.books}
                              onUpdateBook={(book, shelf)=> {
                                  this.UpdateBook(book, shelf)
                              }}
                    ></ListBook>
                )}/>
                <Route path='/search' render={({history}) => (
                    <SearchBook
                        searchResult={this.state.searchResult}
                        onSearchBook={(query,maxResult)=> {
                            this.SearchBook(query,maxResult)
                        }}
                        onAddBook={(shelf,book)=>{
                            this.AddBook(shelf,book)
                            history.push('/')
                        }}
                    ></SearchBook>
                )}/>
            </div>
        )
    }
}

export default BooksApp
