import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import {Route, Switch} from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import ListBooks from './components/ListBooks'
import SearchBook from './components/Search'
import BookInfo from './components/BookInfo'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles/styles'
import './App.css'

class BooksApp extends React.Component {
  state = {
    loading: true,
    books:[],
    filteredBooks:[]
  }

  //API request to get all books and put them into books state

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => this.setState({books: books, loading: false}))
  }

//property updating book on shelves

updateShelf = (book, shelf) => {
  BooksAPI.update(book, shelf).then(()=>{this.fetchBooks()})
}


render() {

  const { books, shelves, loading } = this.state
  const { classes } = this.props


  if (loading === true) {
    return (
      <div className={classes.loading}>
        <ScaleLoader
          size={120}
          color={'#795548'}
          />
        Loading
      </div>
    )
  }

  return (
    <div className="app">
      <Switch>
        <Route exact path="/"
          render={()=> (
            <div>
              <AppBar
                className={classes.appbar}
                position='static'
                color='default'
                >
                <svg
                  className='svg'
                  xmlns="http://www.w3.org/2000/svg"
                  width="75"
                  height="75"
                  viewBox="0 0 24 24">
                  <path
                    d="M13 12h7v1.5h-7zm0-2.5h7V11h-7zm0 5h7V16h-7zM21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 15h-9V6h9v13z"/>
                </svg>
                <Typography
                  className={classes.title}
                  variant='display3'>
                  My Reads
                </Typography>
              </AppBar>
              <ListBooks
                books={books}
                shelves={shelves}
                updateOption={(book,shelf)=>this.updateShelf(book,shelf)}
                />
            </div>
          )}/>
          <Route path="/search"
            render={({history})=> (
              <div>
                <AppBar
                  className={classes.appbar}
                  position='static'
                  color='default'>
                  <svg
                    className='svg'
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 24 24">
                    <path
                      d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  <Typography
                    className={classes.title}
                    variant='display3'>
                    Search
                  </Typography>
                </AppBar>
                <SearchBook
                  filteredBooks={this.state.filteredBooks}
                  books={books}
                  search={(query)=>this.search(query)}
                  updateOption={(book,shelf)=>this.updateShelf(book,shelf)}/>
              </div>
            )}/>
            <Route path='/info/:bookId'
              render={({history, match: {params: {bookId}}, location: {state}})=> (
                <div>
                  <AppBar
                    className={classes.appbar}
                    position='static'
                    color='default'
                    >
                    <svg
                      className='svg'
                      xmlns="http://www.w3.org/2000/svg"
                      width="75"
                      height="75"
                      viewBox="0 0 24 24">
                      <path
                        d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"/>
                    </svg>
                    <Typography
                      className={classes.title}
                      variant='display3'>
                      Book Info
                    </Typography>
                  </AppBar>
                  <BookInfo
                    id={bookId}
                    updateOption={(book,shelf)=>this.updateShelf(book,shelf)}/>
                </div>
              )}/>
            </Switch>
          </div>
        )
      }
    }

    export default withStyles(styles)(BooksApp)
