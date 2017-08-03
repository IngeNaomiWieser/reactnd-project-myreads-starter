import React from 'react'
import { Route } from 'react-router-dom'
import ListBooksContent from './components/ListBooksContent'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks/>
        )}/>
        <Route exact path='/' render={() => (
          <ListBooksContent/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
