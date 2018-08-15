import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import { Link } from 'react-router-dom'
import { ScaleLoader } from 'react-spinners'
import Book from './Book'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { styles } from '../styles/styles'
import { withStyles } from '@material-ui/core/styles'

//Component showing up search input

class SearchBook extends Component {
  state = {
    filteredBooks: [],
    loading: false,
  }

  search = (query) => {
    if(query){
      this.setState({loading: true})
      BooksAPI.search(query).then((result)=>{this.setState({filteredBooks: result, loading: false})
    })} else {
      this.setState({filteredBooks: []})
    }
  }

  render() {

    const { updateOption, classes,} = this.props
    const { filteredBooks, loading } = this.state

    if(loading === true) {
      return (
        <div className={classes.searchBooks}>
          <div className={classes.searchBooksBar}>
            <Input
              className={classes.textField}
              onChange={(event)=>this.search(event.target.value)}
              type="text"
              placeholder="Search Books Here"
              disableUnderline={true}
              />
          </div>
          <div className={classes.loading}>
            <ScaleLoader
              size={120}
              color={'#795548'}
              />
            Loading
          </div>
          <Button
            className={classes.back}
            variant='fab'
            aria-label='return'
            component={Link}
            to="/">
            <ArrowBack/>
          </Button>
        </div>
      )
    }

    return (
      <div className={classes.searchBooks}>
        <div className={classes.searchBooksBar}>
          <Input
            className={classes.textField}
            onChange={(event)=>this.search(event.target.value)}
            type="text"
            placeholder="Search Books Here"
            disableUnderline={true}
            />
        </div>
        <div className={classes.searchBooksResults}>
          <ol className={classes.booksGrid}>
            {filteredBooks.map(book => (<Book book={book} key={book.id} shelf={book.shelf} updateOption={updateOption}/>))}
          </ol>
        </div>
        <Button
          className={classes.back}
          variant='fab'
          aria-label='return'
          component={Link}
          to="/">
          <ArrowBack/>
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SearchBook)
