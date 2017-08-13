import React from 'react'
import { Route } from 'react-router-dom'
import ListBooksContent from './components/ListBooksContent'
import SearchBooks from './components/SearchBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      const bookArray = []
      for (let book of books) {
        bookArray.push(book);
      }
      this.setState({
        books: bookArray
      })
    })
  }

  // showing the books on the page when page renders (for the first time)
  componentDidMount() {
    this.getBooks();
  }

  // this allows moving the books between shelfs, see the BooksAPI.js for more info on update(book, shelf)
  updateShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf; // updating the shelf it was on previously to the shelf it is on now
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
        }));
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdateShelf={this.updateShelf}
            myBooks={this.state.books}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooksContent
            onUpdateShelf={this.updateShelf}
            currentlyReadingBooks={this.state.books.filter(book => book.shelf === 'currentlyReading')}
            wantToReadBooks={this.state.books.filter(book => book.shelf === 'wantToRead')}
            readBooks={this.state.books.filter(book => book.shelf === 'read')}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
