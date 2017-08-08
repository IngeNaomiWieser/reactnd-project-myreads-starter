import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class ListBooksContent extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <Shelf  onUpdateShelf={this.props.onUpdateShelf}
                  shelfTitle="Currently Reading"
                  books={this.props.currentlyReadingBooks}/>
          <Shelf  onUpdateShelf={this.props.onUpdateShelf}
                  shelfTitle="Want to Read"
                  books={this.props.wantToReadBooks}/>
          <Shelf  onUpdateShelf={this.props.onUpdateShelf}
                  shelfTitle="Read"
                  books={this.props.readBooks}/>

          <div className="open-search">
            <Link
              to="/search"
              >Add a book</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ListBooksContent
