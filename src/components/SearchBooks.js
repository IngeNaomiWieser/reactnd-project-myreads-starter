import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {

  state = {
    query: '',
    searchedBooks: []
  }

  // this is for putting the search request from the input into the state (first line of the function)
  // and then for actually searching for the books in the API when someone changes the query by typing
  updateQuery = (query) => {
    this.setState({ query: query.trim() });
    BooksAPI.search(this.state.query, 20).then((books) => {
      this.setState({searchedBooks: books});
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
              // shelfTitle="Books that match your search"
              books={this.state.searchedBooks}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
