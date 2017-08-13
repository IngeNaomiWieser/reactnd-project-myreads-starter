import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchedBooks: [],
      textSearchShelf: ''
    };
  }

  // NOTE: I'm not using regex of sort, but it seems to work because of the API

  // putting the search request from the input into the state query
  updateQuery = (query) => {
    if (query !== '') {
      this.setState({query: query.trim()});
      this.searchBooks(query); // if there is a query, run the searchBooks function
    } else {
      // if there is no query, do this:
       this.setState({query: query.trim(), searchedBooks: [], textSearchShelf: ''});
     }
  }

  // the search API request does not give back a shelf key for the book object.
  // So when we search for a book, we need to check if any of the search results already exists in the list of books.
  // if the one of the books from the search result exists in the list of books, we have to change it to the appropriate shelf type.

  // here we are updating the state of the searchedbooks (only when the query is not an empty string)
  // 'query' in the parameter is the new 'query'-state
  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {       // books is the parameter
      // if the query is legit, you get back an array of objects.
      // if not legit, you get an object with an error key.
      // So... if the object books does not have the key 'error', only then: update the state.
      if (!books.hasOwnProperty('error')) {
        //need to update books to include shelf information
        this.props.myBooks.forEach(myBook => {
          // here we replace the book from the search result that is also in our book list with our book, because our book has the shelf key and the book from the search result does not.
          books = books.filter(b => b.id !== myBook.id).concat([ myBook ])
        })
        this.setState({
          searchedBooks: books,
          textSearchShelf: "Books that match your search"});
      }
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
            >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf
              onUpdateShelf={this.props.onUpdateShelf}
              shelfTitle={this.state.textSearchShelf}
              books={this.state.searchedBooks}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
