import React, { Component } from 'react';

class Shelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf || 'none'}
                            onChange={(event) =>  this.props.onUpdateShelf(book, event.target.value)}
                            >
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
