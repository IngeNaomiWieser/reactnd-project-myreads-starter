import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'

class SearchBooks extends Component {
  // it seems to work without the constructor, but probably better to do it like this:
  // note: even though there are no props here, put the parameter props in there.
  constructor(props) {
    super(props);
    this.state = {
      query: '',    // zoekterm
      searchedBooks: [],
      textSearchShelf: ''
    };
  }

  // NOTE: I'm not using regex of sort, but it seems to work because of the API

  // putting the search request from the input into the state query
  updateQuery = (query) => {
    if (query !== '') {
      this.setState({query: query.trim()}); // trim removes spaces etc
      this.searchBooks(query); // if there is a query, run the searchBooks function
    } else {
      // if there is no query, do this:
       this.setState({query: query.trim(), searchedBooks: [], textSearchShelf: ''});
     }
  }

  // here we are updating the state of the searchedbooks (only when the query is not an empty string)
  // 'query' in the parameter is the new 'query'-state
  searchBooks = (query) => {
    BooksAPI.search(query, 20).then((books) => {       // books is the parameter
      // if the object books does not the key 'error', only then: update the state.
      if (!books.hasOwnProperty('error')) {
        this.setState({ searchedBooks: books, textSearchShelf: "Books that match your search"});
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
