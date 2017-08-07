import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
  // it seems to work without the constructor, but do it like this:
  // note: even though there are no props, put props in there.
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchedBooks: [],
      titleSearchShelf: ''
    };
  }

  // putting the search request from the input into the state query
  updateQuery = (query) => {
    if (query !== '') {
      this.setState({query: query.trim()});
      this.searchBooks(query); // if there is a query, we run the searchBooks function
    } else {
      // if there is no query, do this:
       this.setState({query: query.trim(), searchedBooks: [], titleSearchShelf: ''});
     }
  }

  // here we are updating the state of the searchedbooks (only when the query is not an empty string)
  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {
      // if the object books has the key 'error', don't update the state.
      if (!books.hasOwnProperty('error')) {
        this.setState({ searchedBooks: books, titleSearchShelf: "Books that match your search"});
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
              shelfTitle={this.state.titleSearchShelf}
              books={this.state.searchedBooks}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
