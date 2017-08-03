import React, { Component } from 'react';

class Shelf extends Component {
  render() {

    const shelfBooks = this.props.books

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map(book => (
            <li key={book.title}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style= {{width: 128, height: 193, backgroundImage: book.cover}}></div>
                <div className="book-shelf-changer">
                  <select>
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
    )
  }
}

export default Shelf