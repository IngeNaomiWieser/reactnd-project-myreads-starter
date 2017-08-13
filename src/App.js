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
      currentlyReadingShelf: [],
      wantToReadShelf: [],
      readShelf: []
    };
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      let currentlyReadingArray = [];
      let wantToReadArray = [];
      let readArray = [];
      for (let book of books) {
        if (book.shelf === "currentlyReading") {
          currentlyReadingArray.push(book);
        } else if (book.shelf === "wantToRead") {
          wantToReadArray.push(book);
        } else if (book.shelf === "read") {
          readArray.push(book);
        }
      }
      this.setState({
        currentlyReadingShelf: currentlyReadingArray,
        wantToReadShelf: wantToReadArray,
        readShelf: readArray
      })
    })
  }

  // showing the books on the page when page renders (for the first time)
  componentDidMount() {
    this.getBooks();
  }

  // this allows moving the books between shelfs, see the BooksAPI.js for more info on update(book, shelf)
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {this.getBooks()})
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            onUpdateShelf={this.updateShelf}/>
        )}/>
        <Route exact path='/' render={() => (
          <ListBooksContent
            onUpdateShelf={this.updateShelf}
            currentlyReadingBooks={this.state.currentlyReadingShelf}
            wantToReadBooks={this.state.wantToReadShelf}
            readBooks={this.state.readShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
