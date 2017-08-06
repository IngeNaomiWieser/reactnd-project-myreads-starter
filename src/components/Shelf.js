import React, { Component } from 'react';

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.title}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}`}}></div>
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
      </div>
    )
  }
}

// Below you see a stateless functional component, instead of the class above (we can do this because we only have 'render' as a method in the class, so no state):
// A difference to remember is that you do props.books instead of this.props.books
// function Shelf(props) {
//   return (
//     <div className="bookshelf-books">
//       <ol className="books-grid">
//         {props.books.map(book => (
//           <li key={book.title}>
//           <div className="book">
//             <div className="book-top">
//               <div className="book-cover" style= {{width: 128, height: 193, backgroundImage: book.cover}}></div>
//               <div className="book-shelf-changer">
//                 <select>
//                   <option value="none" disabled>Move to...</option>
//                   <option value="currentlyReading">Currently Reading</option>
//                   <option value="wantToRead">Want to Read</option>
//                   <option value="read">Read</option>
//                   <option value="none">None</option>
//                 </select>
//               </div>
//             </div>
//             <div className="book-title">{book.title}</div>
//             <div className="book-authors">{book.authors}</div>
//           </div>
//           </li>
//         ))}
//       </ol>
//     </div>
//   )
// }

// Or an example with the arrow function (no return statement):
// const Email = (props) => (
//   <div>
//     {props.text}
//   </div>
// )

export default Shelf
